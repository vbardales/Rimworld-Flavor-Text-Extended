// Writes the shorter variants of the dishes: Mod/Defs/FlavorDefs_Variants.xml and _tools/variants-map.json.
//
//   node _tools/make-variants.js            (from the repository root)
//
// Why. Flavor Text cuts a meal's ingredients into chunks of three and names each chunk on its own, and a
// dish only matches a chunk that holds EXACTLY as many ingredients as the dish has slots
// (CompFlavor.GetMatchIndices). 896 of the first 901 dishes have three slots, so they could only name
// meals of exactly three ingredients, while a meal of one or two ingredients (the common ones) was named by
// Flavor Text's own dishes alone.
//
// The rule. A slot may be dropped when it is NOT what makes the dish that dish, and two things say so:
//   1. neither the label nor the description cites it (no {N_...} token), and
//   2. the 2026-09-23 review of the dishes widened it (it was a specific ingredient that the text never
//      used, and it became a broad category). A slot the text does not cite but that still names the dish
//      through a fixed word ("andouillette" is pork) was left specific by that review and stays: without
//      it the dish would be named after a lone potato.
// The widened slots are found by comparing with the dishes as they were before that review (commit 86cba81^), so this needs the git history.
// Without a droppable slot the text still reads the same. So, with D the droppable slots of a 3-slot dish:
//
//   - |D| = 1: a `Duo` variant, the same dish without that slot, two slots;
//   - |D| = 2: a `Duo` variant (the kept slot and the first droppable one) and a `Solo` variant (the kept
//     slot alone, one slot);
//   - otherwise nothing: dropping a slot would mean rewriting the text.
//
// A variant is the original block with a new defName (`<original>Duo`, `<original>Solo`), the same label,
// meal kinds and description, the remaining slots, and the {N_...} tokens renumbered to the new slot order.
// It competes with the original by design: they never match the same chunk, since their slot counts differ.
//
// The French companion translates by defName and needs one entry per variant: variants-map.json says, for each
// variant, which dish it copies and how its tokens were renumbered ("old index": new index), so its text and
// French translation can be copied over mechanically.

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const DEFS = 'Mod/Defs';
const OUT = path.join(DEFS, 'FlavorDefs_Variants.xml');
const MAP = '_tools/variants-map.json';

function slotsOf(block) {
  const ing = block.match(/<ingredients>([\s\S]*?)<\/ingredients>/);
  if (!ing) return { open: 0, close: 0, slots: [] };
  const inner = ing[1];
  const start = block.indexOf(ing[0]) + '<ingredients>'.length;
  const slots = [];
  let depth = 0, from = -1;
  for (const m of inner.matchAll(/<li(?:\s[^>]*)?>|<\/li>/g)) {
    if (m[0].startsWith('</')) {
      depth--;
      if (depth === 0) slots.push(inner.slice(from, m.index + m[0].length));
    } else {
      if (depth === 0) from = m.index;
      depth++;
    }
  }
  return { start, end: start + inner.length, slots };
}

function renumber(text, map) {
  return text.replace(/\{(\d+)_/g, (all, i) => (i in map ? `{${map[i]}_` : all));
}

function variant(block, keep, suffix, replace = {}) {
  const { start, end, slots } = slotsOf(block);
  const map = {};
  keep.forEach((old, i) => { map[old] = i; });
  const body = '\n\t\t\t' + keep.map(i => slots[i].trim()).join('\n\t\t\t') + '\n\t\t';
  let out = block.slice(0, start) + body + block.slice(end);
  out = out.replace(/<defName>([^<]*)<\/defName>/, (all, n) => `<defName>${n}${suffix}</defName>`);
  // A dropped slot the text cites is replaced by the plain word given for it; any other token is renumbered.
  const fix = t => renumber(t.replace(/\{(\d+)_[a-z]+\}/g, (all, i) => (i in replace ? replace[i] : all)), map);
  out = out.replace(/<label>([^<]*)<\/label>/, (all, t) => `<label>${fix(t)}</label>`);
  out = out.replace(/<description>([\s\S]*?)<\/description>/, (all, t) => `<description>${fix(t)}</description>`);
  const left = [...out.matchAll(/\{(\d+)_/g)].map(m => +m[1]).filter(i => i >= keep.length);
  if (left.length) throw new Error(`${block.match(/<defName>([^<]*)/)[1]}${suffix}: the text still cites a slot the form dropped (${left})`);
  return { xml: out, map };
}

// The dishes as they were before the review of 2026-09-23 (the commit before its first "Triage" commit):
// defName -> its slots, whitespace removed. The files had other names then, so every one is read.
const BASE = '86cba81^';
const baseSlots = new Map();
const listing = execSync(`git ls-tree --name-only ${BASE} Mod/Defs/`, { encoding: 'utf8' }).split(/\r?\n/);
for (const p of listing.filter(x => /\/FlavorDefs_[^/]*\.xml$/.test(x))) {
  const old = execSync(`git show ${BASE}:${p}`, { encoding: 'utf8', maxBuffer: 1 << 26 });
  for (const b of old.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    baseSlots.set(b.match(/<defName>([^<]*)<\/defName>/)[1], slotsOf(b).slots.map(s => s.replace(/\s+/g, '')));
  }
}

const files = fs.readdirSync(DEFS).filter(f => /^FlavorDefs_/.test(f) && f !== 'FlavorDefs_Variants.xml').sort();
const variants = [], mapOut = {}, blocks = new Map();
let dishes = 0;
for (const f of files) {
  const xml = fs.readFileSync(path.join(DEFS, f), 'utf8');
  for (const block of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    dishes++;
    const dn = block.match(/<defName>([^<]*)<\/defName>/)[1];
    blocks.set(dn, { block, f });
    const { slots } = slotsOf(block);
    if (slots.length !== 3) continue;
    const oldSlots = baseSlots.get(dn) || [];
    const text = (block.match(/<label>[^<]*<\/label>/) || [''])[0] + (block.match(/<description>[\s\S]*?<\/description>/) || [''])[0];
    const cited = new Set([...text.matchAll(/\{(\d+)_/g)].map(m => +m[1]));
    const widened = i => oldSlots.length === 3 && oldSlots[i] !== slots[i].replace(/\s+/g, '');
    const uncited = [0, 1, 2].filter(i => !cited.has(i) && widened(i));
    const citedList = [0, 1, 2].filter(i => !uncited.includes(i));
    const make = (keep, suffix) => {
      const v = variant(block, keep, suffix);
      variants.push(v.xml);
      mapOut[dn + suffix] = { copies: dn, file: f, slots: keep.length, tokens: v.map };
    };
    if (uncited.length === 1) {
      make(citedList, 'Duo');
    } else if (uncited.length === 2) {
      make([citedList[0], uncited[0]].sort((a, b) => a - b), 'Duo');
      make(citedList, 'Solo');
    }
  }
}

// The one-ingredient forms chosen by hand: _tools/solo-forms.json says which slot stands alone and what replaces a
// dropped ingredient that the text names.
const solo = JSON.parse(fs.readFileSync(path.join(__dirname, 'solo-forms.json'), 'utf8'));
for (const [dn, spec] of Object.entries(solo)) {
  if (dn.startsWith('_') || mapOut[dn + 'Solo']) continue;      // a comment, or a form the rule above already made
  const src = blocks.get(dn);
  if (!src) throw new Error(`solo-forms.json names ${dn}, which is not a dish`);
  const v = variant(src.block, [spec.keep], 'Solo', spec.replace || {});
  variants.push(v.xml);
  mapOut[dn + 'Solo'] = { copies: dn, file: src.f, slots: 1, tokens: v.map, curated: true, replaced: spec.replace || {} };
}

const header = `<?xml version="1.0" encoding="utf-8" ?>
<!--
  Shorter variants of dishes defined elsewhere in this folder. Generated by _tools/make-variants.js: read its
  header for the rule, and change the originals or the script rather than this file.

  Flavor Text names a chunk of at most three ingredients and only with a dish that has exactly as many slots as
  the chunk has ingredients. A dish here is the same dish as its original, minus a slot that is not what
  makes the dish (the rule is in the script), so it can name a meal of two or one ingredients. A variant and its original never match the same
  chunk.
-->
<Defs>

`;
fs.writeFileSync(OUT, header + variants.map(v => '\t' + v.replace(/\n(?=\S)/g, '\n\t')).join('\n\n') + '\n\n</Defs>\n');
fs.writeFileSync(MAP, JSON.stringify(mapOut, null, 1) + '\n');
console.log(`${dishes} dishes read, ${variants.length} variants written to ${OUT}`);
console.log(`  Duo: ${Object.values(mapOut).filter(v => v.slots === 2).length}, Solo: ${Object.values(mapOut).filter(v => v.slots === 1).length}`);
