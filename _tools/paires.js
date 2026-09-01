// Couverture des paires en tenant compte de l'ARBRE : une def qui déclare FT_Pear
// sert aussi la paire Cheese × Fruit, puisque FT_Fruit est un ancêtre de FT_Pear.
const fs=require('fs'),path=require('path');
const FT=process.argv[2], CIBLE=process.argv[3];
const T=require('./arbre.js').load(FT);

function defsOf(dir){
  const out=[];
  for(const f of fs.readdirSync(dir).filter(x=>x.endsWith('.xml'))){
    const s=fs.readFileSync(path.join(dir,f),'utf8');
    for(const b of s.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g)||[]){
      const ing=(b.match(/<ingredients>[\s\S]*?<\/ingredients>/)||[''])[0];
      const slots=[...ing.matchAll(/<categories>([\s\S]*?)<\/categories>/g)]
        .map(m=>[...m[1].matchAll(/<li>(FT_\w+)<\/li>/g)].map(x=>x[1]));
      if(slots.length) out.push({label:(b.match(/<label>(.*?)<\/label>/)||[,'?'])[1],slots});
    }
  }
  return out;
}
const all=[...defsOf('./Defs'),...defsOf(FT)];

// expansion vers les ancêtres
const exp=s=>{const o=new Set();for(const c of s)for(const a of T.anc(c))o.add(a);return o;};
const served=new Map(); // "A|B" -> [labels]
for(const d of all){
  const es=d.slots.map(exp);
  for(let i=0;i<es.length;i++)for(let j=i+1;j<es.length;j++)
    for(const a of es[i])for(const b of es[j]){
      const k=[a,b].sort().join('|');
      if(!served.has(k))served.set(k,[]);
      if(served.get(k).length<4 && !served.get(k).includes(d.label))served.get(k).push(d.label);
    }
}
// combien de defs mentionnent chaque catégorie (descendance comprise)
const pop={};
for(const d of all){const e=exp(d.slots.flat());for(const c of e)pop[c]=(pop[c]||0)+1;}

const cible=CIBLE;
console.log(`\n=== ${cible} : ancêtres = ${[...T.anc(cible)].join(' > ')}`);
console.log(`=== présent dans ${pop[cible]||0} defs\n`);
const rencontres=[],manques=[];
for(const c of T.all){
  if(c===cible||T.anc(cible).has(c)||T.desc(cible).has(c))continue;
  const k=[c,cible].sort().join('|');
  if(served.has(k)) rencontres.push([c,served.get(k)]);
  else if((pop[c]||0)>=6) manques.push([c,pop[c]||0]);
}
console.log(`— RENCONTRE DÉJÀ (${rencontres.length}) :`);
console.log('  '+rencontres.map(([c,l])=>c.replace(/^FT_/,'')).sort().join(', '));
console.log(`\n— NE RENCONTRE JAMAIS, alors que la catégorie est servie ≥6 fois (${manques.length}) :`);
for(const [c,n] of manques.sort((a,b)=>b[1]-a[1])) console.log(`  ${String(n).padStart(4)}  ${c.replace(/^FT_/,'')}`);
