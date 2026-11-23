/* يبني ملفات بنك الأسئلة لكل مادة (تحميل كسول) من data-src/ مع تطبيق التصحيحات.
   التشغيل: node tools/build-bank.js */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
global.window={};
for(const f of ['data-arabic','data-english','data-computer','data-watani8','data-pdfs'])require(path.join(ROOT,'data-src',f+'.js'));
const {BANK,PASSAGES}=window;
const FIX=require('./fixes.js');
const log={dropped:[],fixed:[]};
const out={},meta={total:0,subjects:{},built:new Date().toISOString().slice(0,10)};
for(const s of ['arabic','english','computer']){
  const src=[],srcIdx={};const items=[];const topics={};
  for(const q0 of BANK[s]){
    if(FIX.drop[q0.id]){log.dropped.push([q0.id,FIX.drop[q0.id]]);continue;}
    const q=Object.assign({},q0,FIX.patch[q0.id]||{});
    if(FIX.patch[q0.id])log.fixed.push(q0.id);
    if(FIX.patch[q0.id]&&FIX.patch[q0.id].note)q.e=(q.e?q.e+' ':'')+FIX.patch[q0.id].note;
    if(s!=='arabic'){/* إزالة تلميح حالة الأحرف: إذا اختلف الخيار الصحيح وحده في الحرف الكبير/الصغير داخل جملة فيها فراغ */
      const up=x=>/^[A-Z][a-z]/.test(x),lo=x=>/^[a-z]/.test(x),o=q.o.slice();
      const mid=/\S\s*(_{3,}|\.{3,})/.test(q.q)&&!/^\s*(_{3,}|\.{3,})/.test(q.q);
      const fn=o.every(x=>/^to [a-z]/i.test(x));
      const leak=(up(o[0])&&o.slice(1).every(lo))||(lo(o[0])&&o.length>1&&o.slice(1).every(up));
      if(leak&&(mid||fn)){q.o=o.map(x=>/^[A-Z][a-z]/.test(x)&&!/^I\b/.test(x)?x[0].toLowerCase()+x.slice(1):x);log.fixed.push(q.id+':case');}
    }
    let si=-1;const key=q.src?'u:'+q.src:q.srcName?'n:'+q.srcName:null;
    if(key){if(!(key in srcIdx)){srcIdx[key]=src.length;src.push(q.src?{u:q.src}:{n:q.srcName});}si=srcIdx[key];}
    items.push([q.id,q.t,q.q,q.o,q.e||'',si,q.p||0]);
    topics[q.t]=(topics[q.t]||0)+1;
  }
  const P={};if(s==='english')for(const k in PASSAGES)P[k]=PASSAGES[k];
  const body=`/* بنك أسئلة: ${s} — مُولَّد تلقائياً بواسطة tools/build-bank.js من data-src/ (لا تعدّله يدوياً) */\n(window.__bankLoad||function(s,d){(window.__bankQueue=window.__bankQueue||[]).push([s,d]);})(${JSON.stringify(s)},${JSON.stringify({passages:P,sources:src,items})});\n`;
  fs.writeFileSync(path.join(ROOT,'js/bank',s+'.js'),body);
  meta.subjects[s]={count:items.length,topics,passages:Object.keys(P).length};meta.total+=items.length;
  out[s]=items.length;
}
fs.writeFileSync(path.join(ROOT,'js/bank/meta.js'),'/* مُولَّد تلقائياً */\nwindow.BANK_META='+JSON.stringify(meta)+';\n');
console.log(JSON.stringify(out),'total',meta.total,'dropped',log.dropped.length,'fixed',log.fixed.length);
fs.writeFileSync(path.join(__dirname,'build-log.json'),JSON.stringify(log,null,1));
