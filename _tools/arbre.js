// Construit l'arbre des FlavorCategoryDef (hekmo + le nôtre) et l'expose.
const fs=require('fs'),path=require('path');
function catBlocks(xml){return xml.match(/<FlavorText\.FlavorCategoryDef>[\s\S]*?<\/FlavorText\.FlavorCategoryDef>/g)||[];}
function load(FT){
  const xml=[
    ...['FT_FlavorCategoryDefBasic.xml','FT_FlavorCategoryDefAdvanced.xml'].map(f=>fs.readFileSync(path.join(FT,f),'utf8')),
    ...fs.readdirSync('./Defs').filter(f=>/CategoryDef/.test(f)).map(f=>fs.readFileSync(path.join('./Defs',f),'utf8')),
  ].join('\n');
  const parents={},kids={},info={};
  for(const b of catBlocks(xml)){
    const n=(b.match(/<defName>(\w+)<\/defName>/)||[,null])[1]; if(!n)continue;
    const ps=(b.match(/<parents>[\s\S]*?<\/parents>/)||[''])[0];
    parents[n]=[...ps.matchAll(/<li>(\w+)<\/li>/g)].map(m=>m[1]);
    info[n]={
      keywords:[...((b.match(/<keywords>[\s\S]*?<\/keywords>/)||[''])[0]).matchAll(/<li>([^<]*)<\/li>/g)].map(m=>m[1]),
      sisters:[...((b.match(/<sisterCategories>[\s\S]*?<\/sisterCategories>/)||[''])[0]).matchAll(/<li[^>]*>([^<]*)<\/li>/g)].map(m=>m[1]),
      absorb:[...((b.match(/<thingDefsToAbsorb>[\s\S]*?<\/thingDefsToAbsorb>/)||[''])[0]).matchAll(/<li[^>]*>([^<]*)<\/li>/g)].map(m=>m[1]),
      blacklist:[...((b.match(/<blacklist>[\s\S]*?<\/blacklist>/)||[''])[0]).matchAll(/<li>([^<]*)<\/li>/g)].map(m=>m[1]),
    };
  }
  for(const n in parents) for(const p of parents[n]) (kids[p]=kids[p]||[]).push(n);
  const anc=n=>{const out=new Set(),st=[n];while(st.length){const c=st.pop();if(out.has(c))continue;out.add(c);for(const p of parents[c]||[])st.push(p);}return out;};
  const desc=n=>{const out=new Set(),st=[n];while(st.length){const c=st.pop();if(out.has(c))continue;out.add(c);for(const k of kids[c]||[])st.push(k);}return out;};
  return {parents,kids,info,anc,desc,all:Object.keys(parents)};
}
module.exports={load};
