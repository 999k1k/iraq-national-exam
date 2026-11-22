/* منصة الاختبار الوطني — تطبيق صفحة واحدة بدون أي أدوات بناء */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const fmt1=x=>(Math.round(x*10)/10).toString();
const KEYS_AR=['أ','ب','ج','د'], KEYS_EN=['A','B','C','D'];

/* ---------- إعداد المواد (حقائق موثقة من مواقع الجامعات الرسمية) ---------- */
const SUBJ={
 arabic:{key:'arabic',name:'اللغة العربية',short:'العربية',icon:'ع',cls:'c-ar',color:'var(--ar)',n:60,min:60,code:'',
   pass:[['ماجستير / دكتوراه — جميع التخصصات',50],['ماجستير — تخصص اللغة العربية',60],['دكتوراه — تخصص اللغة العربية',70]]},
 english:{key:'english',name:'اللغة الإنكليزية',short:'الإنكليزي',icon:'En',cls:'c-en',color:'var(--en)',n:40,min:60,code:'INELT',
   pass:[['دبلوم عالي (علمي / إنساني)',50],['ماجستير — تخصصات إنسانية',50],['دكتوراه — تخصصات إنسانية',55],['ماجستير — تخصصات علمية',60],['دكتوراه — تخصصات علمية',65],['ماجستير — تخصصات طبية / لغة إنكليزية',70],['دكتوراه — تخصصات طبية / لغة إنكليزية',75]]},
 computer:{key:'computer',name:'الحاسوب',short:'الحاسوب',icon:'PC',cls:'c-co',color:'var(--co)',n:40,min:60,code:'INCPT',
   pass:[['ماجستير — تخصصات إنسانية',50],['دكتوراه — تخصصات إنسانية',55],['ماجستير — تخصصات علمية',60],['دكتوراه — تخصصات علمية',65],['ماجستير — حاسبات',70],['دكتوراه — حاسبات',75]]}
};
const ORDER=['arabic','english','computer'];
const TOPIC_AR={'Grammar':'القواعد','Language Functions':'وظائف اللغة','Conversation':'المحادثة','Vocabulary':'المفردات','Reading':'القطعة (الاستيعاب)',
 'Computer Basics':'أساسيات الحاسوب','Windows 10':'ويندوز 10','Security & Viruses':'الأمان والفيروسات','MS Word 2016':'وورد 2016','MS Excel 2016':'إكسل 2016','MS PowerPoint 2016':'باوربوينت 2016','Internet & Email':'الإنترنت والبريد','Artificial Intelligence':'الذكاء الاصطناعي'};
const tName=t=>TOPIC_AR[t]?`${TOPIC_AR[t]} <span class="ltr" style="opacity:.6;font-size:.85em">(${t})</span>`:t;
const topicsOf=s=>[...new Set(BANK[s].map(q=>q.t))];

/* ---------- التخزين المحلي ---------- */
const store={
 get(k,d){try{const v=localStorage.getItem('ine_'+k);return v?JSON.parse(v):d;}catch(e){return d;}},
 set(k,v){try{localStorage.setItem('ine_'+k,JSON.stringify(v));}catch(e){}}
};
const getHist=()=>store.get('history',[]);
const getWrong=()=>store.get('wrong',{arabic:[],english:[],computer:[]});
function markWrong(subj,id,isWrong){const w=getWrong();const set=new Set(w[subj]||[]);isWrong?set.add(id):set.delete(id);w[subj]=[...set];store.set('wrong',w);}
function bumpPractice(subj,ok){const p=store.get('practice',{});p[subj]=p[subj]||{a:0,c:0};p[subj].a++;if(ok)p[subj].c++;store.set('practice',p);}
function bestOf(subj){let b=null;getHist().forEach(h=>h.parts.forEach(p=>{if(p.subj===subj&&(b===null||p.score>b))b=p.score;}));return b;}

/* ---------- التوجيه ---------- */
let examState=null, timerId=null;
function route(){
 const h=location.hash.replace(/^#\/?/,'').split('?')[0].split('/');
 const r=h[0]||'home';
 if(examState&&examState.running&&r!=='exam'){ if(!confirm('سيتم إلغاء الامتحان التجريبي الجاري. هل أنت متأكد؟')){location.hash='#/exam';return;} stopExam(); }
 $$('#nav a').forEach(a=>a.classList.toggle('active',a.dataset.r===r||(r==='exam'&&a.dataset.r==='mock')||(r==='result'&&a.dataset.r==='progress')));
 $('#nav').classList.remove('open');
 window.scrollTo(0,0);
 ({home:viewHome,study:()=>viewStudy(h[1]||'arabic'),practice:()=>viewPractice(h[1]),mock:viewMockSetup,exam:viewExam,result:()=>viewResult(h[1]),files:viewFiles,progress:viewProgress}[r]||viewHome)();
}
window.addEventListener('hashchange',route);
$('#menuBtn').onclick=()=>$('#nav').classList.toggle('open');
window.addEventListener('beforeunload',e=>{if(examState&&examState.running){e.preventDefault();e.returnValue='';}});

/* ---------- الصفحة الرئيسية ---------- */
function viewHome(){
 const best=ORDER.map(s=>bestOf(s));
 app.innerHTML=`
 <section class="hero"><div class="wrap fade">
  <span class="eyebrow">العام الدراسي 2026 – 2027</span>
  <h1>التحضير للاختبار الوطني الموحد<br>للمتقدمين للدراسات العليا</h1>
  <p class="lead">ملخصات مركّزة، و${BANK.arabic.length+BANK.english.length+BANK.computer.length} سؤالاً تدريبياً مع الشرح، وامتحان تجريبي يحاكي الاختبار الحقيقي في الوقت وعدد الأسئلة — للغة العربية والإنكليزية والحاسوب.</p>
  <div class="btns"><a class="btn btn-pri" href="#/mock">ابدأ امتحاناً تجريبياً</a><a class="btn btn-ghost" href="#/study/arabic">تصفّح الملخصات</a></div>
  <div class="hero-stats">
   <div class="stat"><b>3</b><span>اختبارات منفصلة</span></div>
   <div class="stat"><b>60</b><span>دقيقة لكل اختبار</span></div>
   <div class="stat"><b>60 · 40 · 40</b><span>أسئلة العربي · الإنكليزي · الحاسوب</span></div>
   <div class="stat"><b>50</b><span>أدنى درجة اجتياز (من 100)</span></div>
  </div>
 </div></section>

 <section class="sec"><div class="wrap">
  <h2>اختر المادة</h2><p class="sub">لكل مادة: ملخص، تدريب فوري بالشرح، وامتحان تجريبي كامل.</p>
  <div class="grid g3">${ORDER.map((s,i)=>{const S=SUBJ[s];return `
   <div class="card subj-card"><div class="ic ${S.cls}">${S.icon}</div>
    <h3>${S.name} ${S.code?`<span class="ltr tag gray">${S.code}</span>`:''}</h3>
    <div class="meta"><span class="tag">${S.n} سؤال</span><span class="tag">${S.min} دقيقة</span><span class="tag blue">${BANK[s].length} سؤال تدريبي</span></div>
    <div style="color:var(--mut);font-size:14px;margin-bottom:14px">${best[i]===null?'لم تجرّب امتحاناً بعد':'أفضل درجة لك: <b style="color:var(--pri)">'+fmt1(best[i])+'</b> / 100'}</div>
    <div class="btns"><a class="btn btn-sm btn-ghost" href="#/study/${s}">الملخص</a><a class="btn btn-sm btn-ghost" href="#/practice/${s}">تدريب</a><a class="btn btn-sm btn-pri" href="#/mock?s=${s}">امتحان تجريبي</a></div>
   </div>`;}).join('')}</div>
 </div></section>

 <section class="sec" style="padding-top:0"><div class="wrap grid g2">
  <div class="card"><h3>ما هو الاختبار الوطني؟</h3>
   <ul class="facts">
    <li>اختبارات موحدة تنظمها <b>وزارة التعليم العالي والبحث العلمي – دائرة البحث والتطوير</b>، واجتيازها شرط أساسي للتقديم على الدراسات العليا (دبلوم عالي، ماجستير، دكتوراه) داخل العراق.<span class="badge-src b-off">رسمي</span></li>
    <li>ثلاثة اختبارات منفصلة: <b>الإنكليزية (INELT)</b>، <b>الحاسوب (INCPT)</b>، و<b>اللغة العربية</b>.<span class="badge-src b-off">رسمي</span></li>
    <li>الأسئلة اختيار من متعدد (MCQ) على الحاسبة، ومدة كل اختبار <b>ساعة واحدة</b>، والنتيجة تظهر مباشرة.<span class="badge-src b-off">رسمي</span></li>
    <li>اختبار الحاسوب <b>باللغة الإنكليزية بالكامل</b> (حسب مركز الحاسبة – جامعة النهرين).<span class="badge-src b-off">رسمي</span></li>
    <li>الرسوم: <b>30,000 دينار</b> للمحاولة الأولى للمادة الواحدة، و<b>20,000</b> للمحاولات اللاحقة، ويمكن الإعادة حتى النجاح.<span class="badge-src b-off">رسمي</span></li>
    <li>صلاحية الشهادة <b>سنتان</b> من تاريخ أداء الاختبار.<span class="badge-src b-off">رسمي</span></li>
    <li>كل سؤال في الحاسوب والإنكليزي = <b>2.5 درجة</b> (40 × 2.5 = 100).<span class="badge-src b-tg">تيليجرام</span></li>
    <li>الإنكليزي غالباً 4 أجزاء × 10 أسئلة: قواعد، قطعة، وظائف اللغة، محادثة.<span class="badge-src b-tg">تيليجرام</span></li>
    <li>كثير من الطلبة يذكرون أن الأسئلة <b>تتكرر</b> من بنك الأسئلة، لذا التدريب المكثف مفيد جداً.<span class="badge-src b-tg">تيليجرام</span></li>
   </ul></div>
  <div class="card"><h3>خطوات الحجز</h3>
   <ol class="steps">
    <li>ادخل موقع الحجز الرسمي <a href="https://inpt.rdd.edu.iq" target="_blank" rel="noopener" class="ltr">inpt.rdd.edu.iq</a> وأنشئ حساباً.</li>
    <li>اختر المادة والمركز الامتحاني (الجامعة) والموعد المناسب.</li>
    <li>أكّد الحجز وادفع الرسوم في المركز خلال <b>72 ساعة</b> من موعد الاختبار، وإلا يُلغى الحجز.</li>
    <li>احضر قبل الموعد (نصف ساعة إلى ساعة) مع <b>البطاقة الوطنية الموحدة</b> أو مستمسك أصلي. يُمنع إدخال الهاتف أو أي جهاز إلكتروني.</li>
   </ol>
   <div class="note">الأوقات المعتادة: الساعة 10 صباحاً و12 ظهراً، والجدول الأسبوعي يختلف حسب المركز والكتاب الوزاري — تأكد من صفحة مركزك.</div>
  </div>
 </div></section>

 <section class="sec" style="padding-top:0"><div class="wrap"><div class="card">
  <h3>درجات الاجتياز المطلوبة</h3><p class="sub mb0">حسب ضوابط الوزارة المنشورة في مواقع الجامعات (من 100).</p>
  <div class="tabs mt" id="passTabs">${ORDER.map((s,i)=>`<button data-s="${s}" class="${i?'':'on'}">${SUBJ[s].name}</button>`).join('')}</div>
  <div id="passTable"></div>
 </div></div></section>

 <section class="sec" style="padding-top:0"><div class="wrap grid g2">
  <div class="card"><h3>نصائح سريعة للنجاح</h3><ul class="facts">
   <li>ادرس الملخص أولاً، ثم تدرّب على أسئلة كل موضوع حتى تصل إلى 80% فأكثر.</li>
   <li>في الحاسوب: احفظ الاختصارات والمصطلحات <b>بالإنكليزي</b> لأن الأسئلة إنكليزية. ركّز على Windows وWord ثم الفيروسات ودوال Excel.</li>
   <li>في الإنكليزي: اقرأ الأسئلة قبل القطعة، وفي المحادثة ركّز على كلام المتحدث الأخير والتعابير الاصطلاحية.</li>
   <li>في العربي: 60 سؤالاً في 60 دقيقة = دقيقة لكل سؤال، لا تتوقف طويلاً عند سؤال واحد.</li>
   <li>لا تترك أي سؤال بلا إجابة — لا توجد درجة سالبة في أسئلة الاختيار من متعدد.</li>
   <li>قدّم امتحانين تجريبيين على الأقل قبل الموعد، وراجع أخطاءك من صفحة «نتائجي».</li></ul></div>
  <div class="card"><h3>المصادر</h3><p style="font-size:14px;color:var(--mut)">المعلومات أعلاه مجمّعة من صفحات الجامعات العراقية الرسمية وأخبار الوزارة، مع تجارب الطلبة من قنوات تيليجرام العامة (مُعلَّمة بـ«تيليجرام»). اعتمد دائماً على إعلان مركزك الامتحاني.</p>
   <ul class="src-list">
    <li><a href="https://dcec.uobaghdad.edu.iq/?page_id=28276" target="_blank" rel="noopener">مركز التعليم المستمر – جامعة بغداد</a></li>
    <li><a href="https://uosamarra.edu.iq/uos-inpt/" target="_blank" rel="noopener">دليل الامتحانات الوطنية 2025-2026 – جامعة سامراء</a></li>
    <li><a href="https://cc.nahrainuniv.edu.iq/%d8%a7%d9%84%d9%85%d9%86%d9%87%d8%a7%d8%ac/" target="_blank" rel="noopener">مركز الحاسبة – جامعة النهرين (الحاسوب بالإنكليزية)</a></li>
    <li><a href="https://ikr.atu.edu.iq/%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1-%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A-%D8%A7%D9%84%D8%B9%D8%B1%D8%A7%D9%82%D9%8A-%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF/" target="_blank" rel="noopener">كلية البوليتكنك – كربلاء</a></li>
    <li><a href="https://www.mawazin.net/Details.aspx?jimare=270267" target="_blank" rel="noopener">موازين نيوز: ضوابط 2026-2027 (13/11/2025)</a></li>
    <li><a href="https://conursing.uobaghdad.edu.iq/?p=35901" target="_blank" rel="noopener">الجدول الأسبوعي المعتمد – كلية التمريض/جامعة بغداد</a></li>
    <li>تيليجرام: <a href="https://t.me/s/alaikhtibarhdhkeoe" target="_blank" rel="noopener">@alaikhtibarhdhkeoe</a>، <a href="https://t.me/s/ksnclnd" target="_blank" rel="noopener">@ksnclnd</a>، <a href="https://t.me/s/nationalscore100" target="_blank" rel="noopener">@nationalscore100</a>، <a href="https://t.me/s/arabicnoorali" target="_blank" rel="noopener">@arabicnoorali</a>، <a href="https://t.me/s/EA99a" target="_blank" rel="noopener">@EA99a</a>، <a href="https://t.me/s/flakavfs" target="_blank" rel="noopener">@flakavfs</a></li>
   </ul></div>
 </div></section>`;
 const draw=s=>{$('#passTable').innerHTML=`<table class="t"><tr><th>نوع الدراسة / التخصص</th><th>درجة الاجتياز</th></tr>${SUBJ[s].pass.map(p=>`<tr><td>${p[0]}</td><td><b>${p[1]}</b></td></tr>`).join('')}</table>`;};
 draw('arabic');
 $$('#passTabs button').forEach(b=>b.onclick=()=>{$$('#passTabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');draw(b.dataset.s);});
}

/* ---------- الملخصات ---------- */
function viewStudy(s){
 if(!SUBJ[s])s='arabic';
 const N=NOTES[s];
 app.innerHTML=`<section class="sec"><div class="wrap fade">
  <div class="subj-switch">${ORDER.map(x=>`<a href="#/study/${x}" class="${x===s?'on':''}">${SUBJ[x].name}</a>`).join('')}</div>
  <h2>${N.title}</h2><p class="sub">${N.sub}</p>
  <div class="study-layout">
   <aside class="card toc no-print"><b style="color:var(--nav)">المحتويات</b>
    ${N.sections.map((x,i)=>`<a href="javascript:void(0)" data-go="n${i}">${x.h}</a>`).join('')}
    <hr style="border:0;border-top:1px solid var(--bd)">
    <a class="btn btn-sm btn-pri" style="width:100%;margin-top:6px" href="#/practice/${s}">تدرّب على ${SUBJ[s].short}</a>
    <a class="btn btn-sm btn-ghost" style="width:100%;margin-top:8px" href="files/${s}-notes.pdf" download>تحميل PDF</a>
   </aside>
   <div>${N.sections.map((x,i)=>`<div class="card note-sec" id="n${i}"><h3>${x.h}</h3><div class="${s==='english'?'ltr':''}">${x.html}</div></div>`).join('')}</div>
  </div></div></section>`;
 $$('[data-go]').forEach(a=>a.onclick=()=>document.getElementById(a.dataset.go).scrollIntoView({behavior:'smooth',block:'start'}));
}

/* ---------- عرض سؤال ---------- */
function qHTML(q,opts,state,idx,total,extra){
 const isL=q.ltr, keys=isL?KEYS_EN:KEYS_AR;
 const P=q.p&&window.PASSAGES[q.p];
 return `<div class="qcard fade">
  <div class="qnum"><span>السؤال ${idx+1} من ${total}</span><span class="tag gray">${tName(q.t)}</span>${extra||''}</div>
  ${P?`<div class="passage ltr"><b>Read the passage: ${esc(P.title)}</b>${esc(P.text)}</div>`:''}
  <div class="qtext ${isL?'ltr':''}">${esc(q.q)}</div>
  <div class="opts ${isL?'ltr':''}">${opts.map((o,i)=>`<button class="opt ${state(i)}" data-i="${i}"><span class="k">${keys[i]}</span><span>${esc(o.text)}</span></button>`).join('')}</div>
  <div id="exp"></div></div>`;
}
const prepOpts=q=>shuffle(q.o.map((t,i)=>({text:t,correct:i===0})));

/* ---------- التدريب ---------- */
function viewPractice(s){
 if(!s||!SUBJ[s.split('?')[0]]){
  const P=store.get('practice',{});
  app.innerHTML=`<section class="sec"><div class="wrap fade"><h2>التدريب الفوري</h2><p class="sub">أجب عن الأسئلة واحصل على التصحيح والشرح مباشرة بعد كل سؤال.</p>
   <div class="grid g3">${ORDER.map(x=>{const p=P[x];return `<div class="card subj-card"><div class="ic ${SUBJ[x].cls}">${SUBJ[x].icon}</div><h3>${SUBJ[x].name}</h3>
   <p style="color:var(--mut);font-size:14px">${p?`أجبت ${p.a} سؤالاً بنسبة صواب ${Math.round(p.c/p.a*100)}%`:'ابدأ أول تدريب لك'}</p><a class="btn btn-pri" href="#/practice/${x}">ابدأ</a></div>`;}).join('')}</div></div></section>`;
  return;
 }
 s=s.split('?')[0];
 const S=SUBJ[s], topics=topicsOf(s), wrongN=(getWrong()[s]||[]).length;
 let sel={topic:'all',count:10};
 app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:760px">
  <div class="subj-switch">${ORDER.map(x=>`<a href="#/practice/${x}" class="${x===s?'on':''}">${SUBJ[x].short}</a>`).join('')}</div>
  <h2>تدريب: ${S.name}</h2><p class="sub">اختر الموضوع وعدد الأسئلة.</p>
  <div class="card">
   <div class="field"><label>الموضوع</label><div class="choice-grid" id="tp">
    <button class="choice on" data-v="all">كل المواضيع<small>${BANK[s].length} سؤال</small></button>
    ${topics.map(t=>`<button class="choice" data-v="${esc(t)}">${TOPIC_AR[t]||t}<small>${BANK[s].filter(q=>q.t===t).length} سؤال</small></button>`).join('')}
    <button class="choice" data-v="wrong" ${wrongN?'':'disabled style="opacity:.5"'}>أخطائي السابقة<small>${wrongN} سؤال</small></button>
   </div></div>
   <div class="field"><label>عدد الأسئلة</label><div class="choice-grid" id="ct">
    ${[10,20,30,0].map((n,i)=>`<button class="choice ${i?'':'on'}" data-v="${n}">${n||'الكل'}</button>`).join('')}</div></div>
   <button class="btn btn-pri" id="go" style="width:100%">ابدأ التدريب</button>
  </div></div></section>`;
 const bind=(id,key)=>$$('#'+id+' .choice').forEach(b=>b.onclick=()=>{if(b.disabled)return;$$('#'+id+' .choice').forEach(x=>x.classList.remove('on'));b.classList.add('on');sel[key]=key==='count'?+b.dataset.v:b.dataset.v;});
 bind('tp','topic');bind('ct','count');
 $('#go').onclick=()=>{
  let pool=BANK[s];
  if(sel.topic==='wrong'){const w=new Set(getWrong()[s]);pool=pool.filter(q=>w.has(q.id));}
  else if(sel.topic!=='all')pool=pool.filter(q=>q.t===sel.topic);
  pool=shuffle(pool); if(sel.count)pool=pool.slice(0,sel.count);
  runPractice(s,pool);
 };
}
function runPractice(s,qs){
 let i=0,correct=0; const res=[];
 const draw=()=>{
  if(i>=qs.length)return finish();
  const q=qs[i], opts=prepOpts(q);
  app.innerHTML=`<section class="sec" style="padding-top:10px"><div class="wrap" style="max-width:820px">
   <div class="quiz-top"><b>${SUBJ[s].name}</b><div class="progress"><i style="width:${i/qs.length*100}%"></i></div><span class="tag ok">صحيح ${correct}</span><span class="tag bad">خطأ ${i-correct}</span></div>
   ${qHTML(q,opts,()=> '',i,qs.length)}
   <div class="qnav-row"><a class="btn btn-ghost btn-sm" href="#/practice/${s}">إنهاء التدريب</a><button class="btn btn-pri" id="next" style="display:none">${i+1<qs.length?'السؤال التالي ←':'عرض النتيجة'}</button></div>
  </div></section>`;
  $$('.opt').forEach(b=>b.onclick=()=>{
   const k=+b.dataset.i, ok=opts[k].correct;
   $$('.opt').forEach((x,j)=>{x.disabled=true;if(opts[j].correct)x.classList.add('right');});
   if(!ok)b.classList.add('wrong'); else correct++;
   bumpPractice(s,ok); markWrong(s,q.id,!ok); res.push(ok);
   $('#exp').innerHTML=`<div class="explain ${ok?'ok':'bad'}"><b>${ok?'إجابة صحيحة.':'إجابة خاطئة.'}</b> ${ok?'':'الصحيح: <b class="'+(q.ltr?'ltr':'')+'">'+esc(q.o[0])+'</b><br>'}${esc(q.e)}</div>`;
   $('#next').style.display='inline-flex'; $('#next').focus();
  });
  $('#next').onclick=()=>{i++;draw();};
 };
 const finish=()=>{
  const pct=qs.length?correct/qs.length*100:0;
  app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:640px"><div class="card res-head">
   <h2>انتهى التدريب </h2>
   <div class="gauge" style="--v:${pct};--c:${pct>=50?'var(--ok)':'var(--bad)'}"><div><b>${Math.round(pct)}%</b><span>${correct} من ${qs.length}</span></div></div>
   <p style="color:var(--mut)">${pct>=80?'ممتاز! أنت جاهز لتجربة امتحان كامل.':pct>=50?'جيد، استمر بالتدريب وراجع أخطاءك.':'راجع الملخص ثم أعد المحاولة، ستتحسن بسرعة.'}</p>
   <div class="btns" style="justify-content:center"><a class="btn btn-pri" href="#/practice/${s}">تدريب جديد</a><a class="btn btn-ghost" href="#/study/${s}">مراجعة الملخص</a><a class="btn btn-acc" href="#/mock?s=${s}">امتحان تجريبي</a></div>
  </div></div></section>`;
 };
 draw();
}

/* ---------- الامتحان التجريبي: الإعداد ---------- */
function viewMockSetup(){
 const qs=new URLSearchParams(location.hash.split('?')[1]||'');
 let sel={mode:SUBJ[qs.get('s')]?qs.get('s'):'arabic',req:{arabic:50,english:50,computer:50}};
 const saved=store.get('req',null); if(saved)sel.req=Object.assign(sel.req,saved);
 const render=()=>{
  const subs=sel.mode==='full'?ORDER:[sel.mode];
  app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:820px">
   <h2>الامتحان التجريبي</h2><p class="sub">يحاكي الاختبار الحقيقي: نفس عدد الأسئلة ونفس الوقت، أسئلة عشوائية من البنك، ولا تظهر الإجابات إلا بعد التسليم.</p>
   <div class="card">
    <div class="field"><label>اختر الامتحان</label><div class="choice-grid" id="md">
     ${ORDER.map(s=>`<button class="choice ${sel.mode===s?'on':''}" data-v="${s}">${SUBJ[s].icon} ${SUBJ[s].name}<small>${SUBJ[s].n} سؤال • ${SUBJ[s].min} دقيقة</small></button>`).join('')}
     <button class="choice ${sel.mode==='full'?'on':''}" data-v="full">الاختبارات الثلاثة<small>140 سؤال • 3 أقسام × 60 دقيقة</small></button>
    </div></div>
    ${subs.map(s=>`<div class="field"><label>نوع دراستك في ${SUBJ[s].name} (لتحديد درجة الاجتياز)</label>
     <select data-s="${s}">${SUBJ[s].pass.map(p=>`<option value="${p[1]}" ${sel.req[s]==p[1]?'selected':''}>${p[0]} — ${p[1]} درجة</option>`).join('')}</select></div>`).join('')}
    <div class="note" style="margin-bottom:16px"><b>التعليمات:</b> المؤقّت يبدأ فور الضغط على «ابدأ». يمكنك التنقل بين الأسئلة ووضع علامة للمراجعة. عند انتهاء الوقت يُسلَّم الامتحان تلقائياً. ${sel.mode==='full'?'كل قسم له وقته المستقل (60 دقيقة) كما في الواقع.':''}</div>
    <button class="btn btn-acc" id="start" style="width:100%;font-size:18px">ابدأ الامتحان الآن</button>
   </div></div></section>`;
  $$('#md .choice').forEach(b=>b.onclick=()=>{sel.mode=b.dataset.v;render();});
  $$('select[data-s]').forEach(x=>x.onchange=()=>{sel.req[x.dataset.s]=+x.value;store.set('req',sel.req);});
  $('#start').onclick=()=>{store.set('req',sel.req);startExam(subs,sel.req);};
 };
 render();
}

/* توليد أسئلة الامتحان حسب هيكل الاختبار الحقيقي */
function pick(pool,n){return shuffle(pool).slice(0,n);}
function buildSection(s){
 const B=BANK[s], by=t=>B.filter(q=>q.t===t);
 let qs=[];
 if(s==='english'){
  const pass=shuffle(Object.keys(PASSAGES)).slice(0,2);
  qs=[...pick(by('Grammar'),8),...pick(by('Vocabulary'),2),...pick(by('Language Functions'),10),...pick(by('Conversation'),10),
      ...pass.flatMap(p=>B.filter(q=>q.p===p))];
 }else if(s==='computer'){
  const plan={'Computer Basics':4,'Windows 10':8,'Security & Viruses':4,'MS Word 2016':8,'MS Excel 2016':6,'MS PowerPoint 2016':4,'Internet & Email':4,'Artificial Intelligence':2};
  Object.keys(plan).forEach(t=>qs.push(...pick(by(t),plan[t])));
  qs=shuffle(qs);
 }else{
  const plan={'النحو':24,'الصرف':10,'الإملاء':9,'الأخطاء اللغوية':5,'الثقافة اللغوية':8,'البلاغة والأساليب':4};
  Object.keys(plan).forEach(t=>qs.push(...pick(by(t),plan[t])));
  qs=shuffle(qs);
 }
 qs=qs.slice(0,SUBJ[s].n);
 return {subj:s,qs:qs.map(q=>({q,opts:prepOpts(q),ans:null,flag:false})),cur:0,timeLeft:SUBJ[s].min*60,used:0,done:false};
}
function startExam(subs,req){
 examState={id:Date.now().toString(36),running:true,mode:subs.length>1?'full':subs[0],req,sections:subs.map(buildSection),si:0,start:Date.now()};
 location.hash='#/exam';
 if(location.hash==='#/exam')viewExam();
}
function stopExam(){clearInterval(timerId);timerId=null;if(examState)examState.running=false;}
function tick(){
 const sec=examState.sections[examState.si];
 sec.timeLeft--; sec.used++;
 const el=$('#timer');
 if(el){el.textContent=mmss(sec.timeLeft);el.classList.toggle('low',sec.timeLeft<=300);}
 if(sec.timeLeft<=0){clearInterval(timerId);alert('انتهى الوقت! سيتم تسليم هذا القسم تلقائياً.');finishSection();}
}
const mmss=t=>{t=Math.max(0,t);return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');};

function viewExam(){
 if(!examState||!examState.running){location.hash='#/mock';return;}
 const sec=examState.sections[examState.si], S=SUBJ[sec.subj];
 if(!timerId)timerId=setInterval(tick,1000);
 const it=sec.qs[sec.cur], answered=sec.qs.filter(x=>x.ans!==null).length;
 app.innerHTML=`<div class="wrap">
  <div class="exam-bar"><span class="ttl">امتحان ${S.name}${examState.sections.length>1?` — القسم ${examState.si+1} من ${examState.sections.length}`:''}</span>
   <span class="tag" style="background:rgba(255,255,255,.15);color:#fff">أُجيب ${answered} / ${sec.qs.length}</span>
   <span class="timer ${sec.timeLeft<=300?'low':''}" id="timer" title="الوقت المتبقي">${mmss(sec.timeLeft)}</span></div>
  <div class="exam-layout">
   <div>${qHTML(it.q,it.opts,i=>it.ans===i?'sel':'',sec.cur,sec.qs.length,it.flag?'<span class="tag gold">معلَّم للمراجعة</span>':'')}
    <div class="qnav-row">
     <button class="btn btn-ghost" id="prev" ${sec.cur===0?'disabled style="opacity:.5"':''}>→ السابق</button>
     <button class="btn btn-ghost" id="flag">${it.flag?'إزالة العلامة':'علّم للمراجعة'}</button>
     ${sec.cur<sec.qs.length-1?'<button class="btn btn-pri" id="next">التالي ←</button>':'<button class="btn btn-acc" id="submit2">تسليم القسم</button>'}
    </div></div>
   <aside class="card palette"><b style="color:var(--nav)">خريطة الأسئلة</b>
    <div class="legend"><span><i style="background:var(--pri)"></i>مُجاب</span><span><i style="background:#fff;border:1px solid var(--bd)"></i>غير مُجاب</span><span><i style="background:var(--acc)"></i>للمراجعة</span></div>
    <div class="pal-grid">${sec.qs.map((x,i)=>`<button data-j="${i}" class="${x.ans!==null?'ans':''} ${x.flag?'flag':''} ${i===sec.cur?'cur':''}">${i+1}</button>`).join('')}</div>
    <button class="btn btn-acc" id="submit" style="width:100%;margin-top:14px">تسليم ${examState.sections.length>1&&examState.si<examState.sections.length-1?'القسم':'الامتحان'}</button>
    <a href="#/mock" class="btn btn-sm btn-ghost" style="width:100%;margin-top:8px">إلغاء الامتحان</a>
   </aside></div></div>`;
 $$('.opt').forEach(b=>b.onclick=()=>{it.ans=+b.dataset.i;$$('.opt').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');
   const pb=$(`.pal-grid button[data-j="${sec.cur}"]`);pb&&pb.classList.add('ans');
   $('.exam-bar .tag').textContent=`أُجيب ${sec.qs.filter(x=>x.ans!==null).length} / ${sec.qs.length}`;});
 const go=j=>{sec.cur=j;viewExam();window.scrollTo({top:0});};
 $('#prev').onclick=()=>sec.cur>0&&go(sec.cur-1);
 $('#next')&&($('#next').onclick=()=>go(sec.cur+1));
 $('#flag').onclick=()=>{it.flag=!it.flag;viewExam();};
 $$('.pal-grid button').forEach(b=>b.onclick=()=>go(+b.dataset.j));
 const ask=()=>confirmSubmit(sec);
 $('#submit').onclick=ask; $('#submit2')&&($('#submit2').onclick=ask);
}
function confirmSubmit(sec){
 const un=sec.qs.filter(x=>x.ans===null).length, fl=sec.qs.filter(x=>x.flag).length;
 const m=document.createElement('div');m.className='modal-bg';
 m.innerHTML=`<div class="modal"><h3>هل تريد التسليم؟</h3><p>${un?`لديك <b style="color:var(--bad)">${un}</b> سؤال بدون إجابة.`:'أجبت عن جميع الأسئلة'} ${fl?`<br>و<b>${fl}</b> سؤال معلَّم للمراجعة.`:''}</p>
  <p style="color:var(--mut);font-size:14px">الوقت المتبقي: ${mmss(sec.timeLeft)}</p>
  <div class="btns" style="justify-content:center"><button class="btn btn-ghost" id="mNo">رجوع</button><button class="btn btn-acc" id="mYes">نعم، سلّم</button></div></div>`;
 document.body.appendChild(m);
 $('#mNo',m).onclick=()=>m.remove();
 $('#mYes',m).onclick=()=>{m.remove();finishSection();};
}
function finishSection(){
 clearInterval(timerId);timerId=null;
 const st=examState, sec=st.sections[st.si]; sec.done=true;
 if(st.si<st.sections.length-1){
  st.si++;
  const nx=SUBJ[st.sections[st.si].subj];
  app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:560px"><div class="card center">
   <h2>انتهى قسم ${SUBJ[sec.subj].name}</h2><p>القسم التالي: <b>${nx.name}</b> — ${nx.n} سؤال في ${nx.min} دقيقة.</p>
   <p style="color:var(--mut)">خذ نفساً عميقاً، وعندما تكون جاهزاً اضغط للبدء.</p>
   <button class="btn btn-acc" id="nextSec">ابدأ القسم التالي</button></div></div></section>`;
  $('#nextSec').onclick=()=>viewExam();
  return;
 }
 // حساب النتيجة
 st.running=false;
 const parts=st.sections.map(sc=>{
  const n=sc.qs.length; let c=0,w=0,u=0; const topics={};
  const items=sc.qs.map(x=>{const ok=x.ans!==null&&x.opts[x.ans].correct; if(x.ans===null)u++; else if(ok)c++; else w++;
    topics[x.q.t]=topics[x.q.t]||{c:0,n:0}; topics[x.q.t].n++; if(ok)topics[x.q.t].c++;
    markWrong(sc.subj,x.q.id,!ok);
    return {id:x.q.id,your:x.ans===null?null:x.opts[x.ans].text,ok};});
  const score=c/n*100;
  return {subj:sc.subj,n,c,w,u,score:Math.round(score*10)/10,req:st.req[sc.subj],pass:score>=st.req[sc.subj],topics,items,used:sc.used};
 });
 const rec={id:st.id,date:new Date().toISOString(),mode:st.mode,parts};
 const h=getHist(); h.unshift(rec); store.set('history',h.slice(0,50));
 examState=null;
 location.hash='#/result/'+rec.id;
}
const grade=s=>s>=90?'امتياز':s>=80?'جيد جداً':s>=70?'جيد':s>=60?'متوسط':s>=50?'مقبول':'ضعيف';

/* ---------- النتيجة ---------- */
function viewResult(id){
 const rec=getHist().find(h=>h.id===id);
 if(!rec){app.innerHTML='<div class="wrap empty">لم يتم العثور على النتيجة.</div>';return;}
 const byId={};ORDER.forEach(s=>BANK[s].forEach(q=>byId[q.id]=q));
 const allPass=rec.parts.every(p=>p.pass);
 app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:960px">
  <h2>نتيجة الامتحان التجريبي</h2><p class="sub">${new Date(rec.date).toLocaleString('ar-IQ',{dateStyle:'full',timeStyle:'short'})}</p>
  ${rec.parts.length>1?`<div class="card center" style="margin-bottom:18px"><h3>${allPass?' مبروك! اجتزت الاختبارات الثلاثة':'لم تجتز جميع الاختبارات بعد — ركّز على المادة التي لم تجتزها'}</h3></div>`:''}
  ${rec.parts.map((p,pi)=>{const S=SUBJ[p.subj];return `
  <div class="card" style="margin-bottom:22px" id="res-${p.subj}">
   <div class="grid g2" style="align-items:center">
    <div class="res-head"><div class="gauge" style="--v:${p.score};--c:${p.pass?'var(--ok)':'var(--bad)'}"><div><b>${fmt1(p.score)}</b><span>من 100</span></div></div>
     <div class="verdict ${p.pass?'ok':'bad'}">${p.pass?'ناجح':'لم تجتز'} — المطلوب ${p.req}</div></div>
    <div><h3>${S.name}</h3>
     <table class="t"><tr><td>الإجابات الصحيحة</td><td><b style="color:var(--ok)">${p.c}</b> من ${p.n}</td></tr>
      <tr><td>الإجابات الخاطئة</td><td><b style="color:var(--bad)">${p.w}</b></td></tr>
      <tr><td>بدون إجابة</td><td><b>${p.u}</b></td></tr>
      <tr><td>درجة السؤال الواحد</td><td>${fmt1(100/p.n)}</td></tr>
      <tr><td>التقدير</td><td><b>${grade(p.score)}</b></td></tr>
      <tr><td>الوقت المستغرق</td><td class="ltr" style="text-align:right">${mmss(p.used)}</td></tr></table></div>
   </div>
   <h3 class="mt">الأداء حسب الموضوع</h3>
   ${Object.entries(p.topics).map(([t,v])=>{const pc=v.c/v.n*100;return `<div class="topic-row"><div class="h"><span>${tName(t)}</span><b>${v.c}/${v.n}</b></div><div class="bar"><i style="width:${pc}%;background:${pc>=70?'var(--ok)':pc>=50?'var(--acc)':'var(--bad)'}"></i></div></div>`;}).join('')}
   <h3 class="mt">مراجعة الإجابات</h3>
   <div class="tabs" data-p="${pi}"><button class="on" data-f="bad">الخاطئة وغير المُجابة (${p.w+p.u})</button><button data-f="all">الكل (${p.n})</button></div>
   <div class="rev" id="rev${pi}"></div>
  </div>`;}).join('')}
  <div class="btns" style="justify-content:center"><a class="btn btn-acc" href="#/mock">امتحان جديد</a><a class="btn btn-ghost" href="#/practice">تدريب على الأخطاء</a><a class="btn btn-ghost" href="#/progress">كل نتائجي</a></div>
 </div></section>`;
 const drawRev=(pi,f)=>{
  const p=rec.parts[pi];
  const list=p.items.map((it,i)=>({it,i})).filter(x=>f==='all'||!x.it.ok);
  $('#rev'+pi).innerHTML=list.length?list.map(({it,i})=>{const q=byId[it.id];if(!q)return'';const L=q.ltr?'ltr':'';
   return `<div class="rev-item ${it.ok?'ok':it.your===null?'skip':'bad'}"><div class="qnum">سؤال ${i+1} • ${tName(q.t)}</div>
    ${q.p&&PASSAGES[q.p]?`<div style="font-size:13px;color:var(--mut)">(Passage: ${esc(PASSAGES[q.p].title)})</div>`:''}
    <div class="${L}" style="font-weight:700">${esc(q.q)}</div>
    <div class="ans-line">إجابتك: ${it.your===null?'<span class="tag gray">لم تُجب</span>':`<b class="${L}" style="color:${it.ok?'var(--ok)':'var(--bad)'}">${esc(it.your)}</b>`}</div>
    ${it.ok?'':`<div class="ans-line">الإجابة الصحيحة: <b class="${L}" style="color:var(--ok)">${esc(q.o[0])}</b></div>`}
    <div class="ans-line" style="color:var(--mut)">${esc(q.e)}</div></div>`;}).join(''):'<div class="empty">لا توجد أخطاء — أداء رائع!</div>';
 };
 rec.parts.forEach((p,pi)=>drawRev(pi,'bad'));
 $$('.tabs[data-p]').forEach(t=>$$('button',t).forEach(b=>b.onclick=()=>{$$('button',t).forEach(x=>x.classList.remove('on'));b.classList.add('on');drawRev(+t.dataset.p,b.dataset.f);}));
}

/* ---------- الملفات ---------- */
function viewFiles(){
 const F=[['arabic-notes','ملخص اللغة العربية','النحو والصرف والإملاء والثقافة اللغوية والبلاغة','var(--ar)'],
  ['english-notes','English Summary (INELT)','Grammar, functions, conversation, reading, vocabulary','var(--en)'],
  ['computer-notes','ملخص الحاسوب (INCPT)','Windows, Word, Excel, PowerPoint, Internet, AI + الاختصارات','var(--co)'],
  ['arabic-bank','بنك أسئلة العربي مع الإجابات',BANK.arabic.length+' سؤالاً مع الإجابة والشرح','var(--ar)'],
  ['english-bank','English Question Bank + Answers',BANK.english.length+' questions with answers','var(--en)'],
  ['computer-bank','بنك أسئلة الحاسوب مع الإجابات',BANK.computer.length+' سؤالاً (بالإنكليزية) مع الشرح','var(--co)']];
 app.innerHTML=`<section class="sec"><div class="wrap fade"><h2>ملفات للتحميل</h2><p class="sub">ملفات PDF جاهزة للطباعة أو المذاكرة على الهاتف بدون إنترنت.</p>
  <div class="grid g3">${F.map(f=>`<div class="card files-card"><div class="fi" style="background:${f[3]}">PDF</div><div style="flex:1"><h3 style="font-size:17px;margin:0">${f[1]}</h3><div style="color:var(--mut);font-size:14px">${f[2]}</div>
   <a class="btn btn-sm btn-pri" style="margin-top:8px" href="files/${f[0]}.pdf" download>تحميل</a> <a class="btn btn-sm btn-ghost" style="margin-top:8px" href="files/${f[0]}.pdf" target="_blank">عرض</a></div></div>`).join('')}</div>
  <div class="note mt">ملاحظة: الأسئلة في هذه الملفات نماذج تدريبية مكتوبة على نمط الاختبار الوطني ومراجَعة بعناية، وليست أسئلة الوزارة الرسمية.</div>
 </div></section>`;
}

/* ---------- نتائجي ---------- */
function viewProgress(){
 const h=getHist(), P=store.get('practice',{}), W=getWrong();
 app.innerHTML=`<section class="sec"><div class="wrap fade"><h2>نتائجي وتقدّمي</h2><p class="sub">تُحفظ نتائجك على جهازك فقط (في المتصفح).</p>
  <div class="grid g3">${ORDER.map(s=>{const b=bestOf(s),p=P[s];return `<div class="card"><h3>${SUBJ[s].name}</h3>
   <div>أفضل امتحان: <b style="color:var(--pri)">${b===null?'—':fmt1(b)+' / 100'}</b></div>
   <div>أسئلة التدريب: <b>${p?p.a:0}</b> ${p?`(صواب ${Math.round(p.c/p.a*100)}%)`:''}</div>
   <div>أسئلة تحتاج مراجعة: <b style="color:var(--bad)">${(W[s]||[]).length}</b></div>
   ${(W[s]||[]).length?`<a class="btn btn-sm btn-ghost mt" href="#/practice/${s}">راجع أخطائي</a>`:''}</div>`;}).join('')}</div>
  <div class="card mt"><h3>سجل الامتحانات التجريبية</h3>
   ${h.length?`<div style="overflow:auto"><table class="t hist-table"><tr><th>التاريخ</th><th>الامتحان</th><th>الدرجات</th><th>النتيجة</th><th></th></tr>
   ${h.map(r=>`<tr><td>${new Date(r.date).toLocaleDateString('ar-IQ')}</td><td>${r.parts.length>1?'الثلاثة':SUBJ[r.parts[0].subj].name}</td>
    <td>${r.parts.map(p=>`${SUBJ[p.subj].short}: <b>${fmt1(p.score)}</b>`).join(' • ')}</td>
    <td>${r.parts.every(p=>p.pass)?'<span class="tag ok">ناجح</span>':'<span class="tag bad">لم يجتز</span>'}</td>
    <td><a class="btn btn-sm btn-ghost" href="#/result/${r.id}">التفاصيل</a></td></tr>`).join('')}</table></div>
   <button class="btn btn-sm btn-ghost mt" id="clr">مسح السجل</button>`:'<div class="empty">لم تقدّم أي امتحان تجريبي بعد. <a href="#/mock">ابدأ الآن</a></div>'}
  </div></div></section>`;
 $('#clr')&&($('#clr').onclick=()=>{if(confirm('مسح كل النتائج والتقدم؟')){['history','practice','wrong'].forEach(k=>localStorage.removeItem('ine_'+k));viewProgress();}});
}

route();
})();
