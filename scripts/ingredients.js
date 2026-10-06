// Lists the edible ThingDefs of the installed mods and tests whether they fall into
// a SPECIFIC Flavor Text category, or only into a catch-all.
const fs=require('fs'),path=require('path');
const FT=process.argv[2], WS=process.argv[3];
const T=require('./tree.js').load(FT);

// keywords per category, using FlavorText's scoring (multi-word = +6)
const cats=[];
for(const c of T.all){
  const i=T.info[c]; if(!i||!i.keywords.length) continue;
  cats.push({name:c,kw:i.keywords.map(k=>k.toLowerCase()),bl:(i.blacklist||[]).map(k=>k.toLowerCase())});
}
const GEN=new Set(['FT_Ingredients','FT_Foods','FT_FoodRaw','FT_PlantFoodRaw','FT_Vegetable','FT_Fruit',
  'FT_Grain','FT_MeatRaw','FT_AnimalProductRaw','FT_Meat_Mammal','FT_Vegetarian','FT_Items','FT_Root','FT_Dairy']);

function score(label,kws){
  const l=' '+label.toLowerCase()+' ', toks=label.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let s=0;
  for(const k of kws){
    if(k.includes(' ')){ if(l.includes(k)) s+=6; continue; }
    for(const t of toks){ if(t.includes(k)) s+=1; if(t.startsWith(k)||t.endsWith(k)) s+=1; if(t===k) s+=1; }
  }
  return s;
}

const FOOD=/PlantFoodRaw|MeatRaw|AnimalProductRaw|EggsFertilized|EggsUnfertilized|Foods/;
const found=new Map();
let scanned=0;
for(const dir of fs.readdirSync(WS)){
  const root=path.join(WS,dir);
  const stack=[root];
  while(stack.length){
    const d=stack.pop();
    let ents; try{ ents=fs.readdirSync(d,{withFileTypes:true}); }catch{ continue; }
    for(const e of ents){
      const p=path.join(d,e.name);
      if(e.isDirectory()){ if(!/Textures|Sounds|Assemblies|Languages|About|Source/i.test(e.name)) stack.push(p); }
      else if(e.name.endsWith('.xml')){
        let s; try{ s=fs.readFileSync(p,'utf8'); }catch{ continue; }
        if(!s.includes('<thingCategories>')) continue;
        scanned++;
        for(const b of s.match(/<ThingDef[\s\S]*?<\/ThingDef>/g)||[]){
          const tc=(b.match(/<thingCategories>[\s\S]*?<\/thingCategories>/)||[''])[0];
          if(!FOOD.test(tc)) continue;
          const dn=(b.match(/<defName>([\w.]+)<\/defName>/)||[])[1];
          const lb=(b.match(/<label>([^<]+)<\/label>/)||[])[1];
          if(!dn||!lb) continue;
          if(!found.has(dn)) found.set(dn,{lb,mod:dir});
        }
      }
    }
  }
}
console.log(`${found.size} edible ThingDefs found in ${scanned} def files\n`);

const orphelins=[], generiques=[];
for(const [dn,{lb,mod}] of found){
  let best=null,bs=0;
  for(const c of cats){
    let s=score(lb,c.kw);
    if(s>=3) for(const b of c.bl) s-=2*score(lb,[b]);
    if(s>bs){bs=s;best=c.name;}
  }
  // explicitly absorbed?
  const absorbe=T.all.find(c=>(T.info[c].absorb||[]).includes(dn));
  if(absorbe){ continue; }
  if(bs<3) orphelins.push({dn,lb,mod});
  else if(GEN.has(best)) generiques.push({dn,lb,best,mod});
}
console.log(`— NO category recognizes them (${orphelins.length}):`);
for(const o of orphelins.slice(0,60)) console.log(`   ${o.lb.padEnd(28)} ${o.dn}`);
if(orphelins.length>60) console.log(`   ... and ${orphelins.length-60} more`);
console.log(`\n— recognized, but only by a CATCH-ALL (${generiques.length}):`);
for(const g of generiques.slice(0,40)) console.log(`   ${g.lb.padEnd(28)} -> ${g.best}`);
if(generiques.length>40) console.log(`   ... and ${generiques.length-40} more`);
