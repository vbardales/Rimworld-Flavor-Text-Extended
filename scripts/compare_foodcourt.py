"""Static discovery comparison; deliberately does not certify runtime categorization."""
import json, re, hashlib, unicodedata, sys
from pathlib import Path
import xml.etree.ElementTree as ET
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
REG = ROOT.parents[1] / 'FoodCourt/Registre/registre.json'
UP = Path('C:/Program Files (x86)/Steam/steamapps/workshop/content/294100/3245374432/1.6/Defs')
OUT = ROOT / 'Audit-FoodCourt'
OUT.mkdir(exist_ok=True)
raw = REG.read_bytes()
registry = json.loads(raw)
cats, dishes = {}, []
for folder in (UP, ROOT / 'Mod/Defs'):
    for path in folder.rglob('*.xml'):
        for node in ET.parse(path).getroot():
            if node.tag == 'FlavorText.FlavorCategoryDef':
                cats[node.findtext('defName')] = node
            elif node.tag == 'FlavorText.FlavorDef' and node.findtext('defName'):
                dishes.append({'defName': node.findtext('defName'), 'label': node.findtext('label', ''), 'source': str(path), 'extension': folder != UP})
for path in (ROOT / 'Mod/Patches').glob('*.xml'):
    for op in ET.parse(path).getroot():
        m = re.search(r'\[defName="([^"]+)"\]/(\w+)$', op.findtext('xpath', ''))
        if m and m[1] in cats:
            target = cats[m[1]].find(m[2])
            if target is None:
                target = ET.SubElement(cats[m[1]], m[2])
            for child in op.findall('value/li'):
                target.append(child)

def norm(s):
    return re.sub(r'[^a-z0-9]+', ' ', ''.join(c for c in unicodedata.normalize('NFKD', s.lower()) if not unicodedata.combining(c))).strip()

labels = {}
for d in dishes:
    labels.setdefault(norm(d['label']), []).append(d['defName'])
forms = set()
for path in (ROOT.parent / 'FlavorTextExtendedFR/Mod/Patches').glob('*.xml'):
    forms.update(n.text for n in ET.parse(path).findall('.//dictionary/li/key'))

prepared = [(name, {x.text for x in cat.findall('thingDefsToAbsorb/li')},
             [x.text.lower() for x in cat.findall('keywords/li') if x.text],
             {x.text for x in cat.findall('sisterCategories/li') + cat.findall('categoryDefsToAbsorb/li')})
            for name, cat in cats.items()]
rows = []
for item in registry['items']:
    direct, lexical, fallback = [], [], []
    split = re.sub(r'(?<=[a-z])([A-Z])', r' \1', item['defName']).replace('_', ' ').replace('-', ' ').lower()
    text = split + ' ' + item.get('label', '').lower().replace('-', ' ')
    for name, explicit, words, sisters in prepared:
        if item['defName'] in explicit:
            direct.append(name)
        if any(w in text for w in words):
            lexical.append(name)
        if sisters.intersection(item.get('categories', [])):
            fallback.append(name)
    rows.append({**item, 'explicitCategories': direct, 'lexicalCandidates': lexical,
                 'categoryCandidates': fallback, 'sameDishLabel': labels.get(norm(item.get('label', '')), []),
                 'hasExplicitFrenchForms': item['defName'] in forms})
summary = {'registryGenerated': registry['generated'], 'registrySha256': hashlib.sha256(raw).hexdigest(),
           'entries': len(rows), 'uniquePackageDefPairs': len({(r['packageId'], r['defName']) for r in rows}),
           'types': dict(Counter(r['type'] for r in rows)), 'flavorDishes': len(dishes),
           'extensionDishes': sum(d['extension'] for d in dishes), 'categories': len(cats),
           'explicitReferenceRows': sum(bool(r['explicitCategories']) for r in rows),
           'lexicalCandidateRows': sum(bool(r['lexicalCandidates']) for r in rows),
           'noDirectOrLexicalRows': sum(not r['explicitCategories'] and not r['lexicalCandidates'] for r in rows),
           'sameDishLabelRows': sum(bool(r['sameDishLabel']) for r in rows)}
result = {'summary': summary, 'limits': 'Static candidates only: not engine scores, blacklist/inheritance resolution, active load order, translated labels, ingredient eligibility or recipe equivalence. No-hit rows are review candidates, not proven incompatibilities. French forms presence is not package activation coverage.', 'rows': rows}
(OUT / 'comparison.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(summary, ensure_ascii=False, indent=2))
missing = [r for r in rows if not r['explicitCategories'] and not r['lexicalCandidates']]
print('NO HIT SAMPLE:')
for r in missing[:60]:
    print(r['type'], '|', r['defName'], '|', r['label'], '|', r['mod'])
