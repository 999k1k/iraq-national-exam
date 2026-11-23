/* منصة الاختبار الوطني — تطبيق صفحة واحدة بدون أدوات بناء، يعمل دون اتصال ويحفظ التقدّم في المتصفح */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const app=$('#app'), G=window.GUIDE, META=window.BANK_META;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const fmt1=x=>(Math.round(x*10)/10).toString();
const pct=(c,a)=>a?Math.round(c/a*100):0;
const KEYS_AR=['أ','ب','ج','د','هـ'], KEYS_EN=['A','B','C','D','E'];
const ICON={
 sun:'<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg class="i" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 timer:'<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>',
 menu:'<svg class="i" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 x:'<svg class="i" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 flag:'<svg class="i" viewBox="0 0 24 24"><path d="M5 21V4h11l-1.5 4L16 12H5"/></svg>',
 grid:'<svg class="i" viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
 eye:'<svg class="i" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
};

/* ---------- المواد ---------- */
const SUBJ={
 arabic:{key:'arabic',name:'اللغة العربية',short:'العربي',icon:'ع',n:60,min:60,code:'',ltr:false},
 english:{key:'english',name:'اللغة الإنكليزية',short:'الإنكليزي',icon:'En',n:40,min:60,code:'INELT',ltr:true},
 computer:{key:'computer',name:'الحاسوب',short:'الحاسوب',icon:'PC',n:40,min:60,code:'INCPT',ltr:true}
};
const ORDER=['arabic','english','computer'];
ORDER.forEach(s=>{SUBJ[s].pass=G.pass[s].rows.map(r=>[r[0],r[1]]);});
const TOPIC_AR={'Grammar':'القواعد','Language Functions':'وظائف اللغة','Conversation':'المحادثة','Vocabulary':'المفردات','Reading':'القطع (الاستيعاب)',
 'Computer Basics':'أساسيات الحاسوب','Windows 10':'ويندوز 10','Security & Viruses':'الأمان والفيروسات','MS Word 2016':'وورد 2016','MS Excel 2016':'إكسل 2016','MS PowerPoint 2016':'باوربوينت 2016','Internet & Email':'الإنترنت والبريد','Artificial Intelligence':'الذكاء الاصطناعي'};
const tName=t=>TOPIC_AR[t]||t;
const tFull=t=>TOPIC_AR[t]?`${TOPIC_AR[t]} <span class="ltr muted" style="font-size:.85em">(${esc(t)})</span>`:esc(t);

/* ---------- التخزين المحلي ---------- */
const store={
 get(k,d){try{const v=localStorage.getItem('ine_'+k);return v?JSON.parse(v):d;}catch(e){return d;}},
 set(k,v){try{localStorage.setItem('ine_'+k,JSON.stringify(v));}catch(e){}},
 del(k){try{localStorage.removeItem('ine_'+k);}catch(e){}}
};
const dayKey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const getHist=()=>store.get('history',[]);
const getWrong=()=>store.get('wrong',{arabic:[],english:[],computer:[]});
function markWrong(subj,id,isWrong){const w=getWrong();const set=new Set(w[subj]||[]);isWrong?set.add(id):set.delete(id);w[subj]=[...set];store.set('wrong',w);}
function record(subj,topic,ok){
 const st=store.get('stats',{});st[subj]=st[subj]||{};const t=st[subj][topic]=st[subj][topic]||{a:0,c:0};t.a++;if(ok)t.c++;store.set('stats',st);
 const p=store.get('practice',{});p[subj]=p[subj]||{a:0,c:0};p[subj].a++;if(ok)p[subj].c++;store.set('practice',p);
 const d=store.get('days',{});const k=dayKey();d[k]=(d[k]||0)+1;store.set('days',d);
}
function streak(){const d=store.get('days',{});let n=0;const t=new Date();if(!d[dayKey(t)])t.setDate(t.getDate()-1);while(d[dayKey(t)]){n++;t.setDate(t.getDate()-1);}return n;}
const todayCount=()=>store.get('days',{})[dayKey()]||0;
const goal=()=>store.get('goal',40);
function subjStats(s){const st=store.get('stats',{})[s]||{};let a=0,c=0;for(const t in st){a+=st[t].a;c+=st[t].c;}return {a,c,topics:st};}
function bestOf(subj){let b=null;getHist().forEach(h=>h.parts.forEach(p=>{if(p.subj===subj&&(b===null||p.score>b))b=p.score;}));return b;}

/* ---------- المظهر ---------- */
const theme={
 get(){return store.get('theme',null)||(matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');},
 apply(t){document.documentElement.dataset.theme=t;const b=$('#themeBtn');if(b){b.innerHTML=t==='dark'?ICON.sun:ICON.moon;b.setAttribute('aria-label',t==='dark'?'الوضع الفاتح':'الوضع الداكن');}
  const m=$('meta[name=theme-color]');if(m)m.content=t==='dark'?'#0b1320':'#ffffff';}
};
theme.apply(theme.get());
const toast=(msg,ms=2200)=>{const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),ms);};

/* ---------- تحميل بنك الأسئلة عند الحاجة (لكل مادة) ---------- */
const BANK={}, PASSAGES={}; window.BANK=BANK; window.PASSAGES=PASSAGES;
const loading={};
function ingest(s,d){
 Object.assign(PASSAGES,d.passages||{});
 BANK[s]=d.items.map(x=>{const src=x[5]>=0?d.sources[x[5]]:null;return {id:x[0],t:x[1],q:x[2],o:x[3],e:x[4],src:src&&src.u||null,srcName:src&&src.n||null,p:x[6]||null,ltr:SUBJ[s].ltr};});
}
window.__bankLoad=(s,d)=>{ingest(s,d);if(loading[s])loading[s].res();};
(window.__bankQueue||[]).forEach(([s,d])=>ingest(s,d));
function ensure(list){
 list=[].concat(list);
 return Promise.all(list.map(s=>{
  if(BANK[s])return Promise.resolve();
  if(loading[s])return loading[s].p;
  let res,rej;const p=new Promise((a,b)=>{res=a;rej=b;});loading[s]={p,res};
  const el=document.createElement('script');el.src='js/bank/'+s+'.js?v='+(window.APP_V||'5');el.async=true;
  el.onerror=()=>{delete loading[s];rej(new Error('load '+s));};
  document.head.appendChild(el);return p;
 }));
}
window.ensureBank=ensure;
const spinner=()=>{app.innerHTML='<div class="wrap empty" aria-busy="true">جارٍ تحميل الأسئلة…</div>';};
function withBank(list,fn){
 const l=[].concat(list);
 if(l.every(s=>BANK[s]))return fn();
 spinner();
 const tok=++routeTok;
 ensure(l).then(()=>{if(tok===routeTok){fn();setTitle();}}).catch(()=>{app.innerHTML='<div class="wrap empty">تعذّر تحميل الأسئلة. تحقّق من الاتصال ثم <a href="javascript:location.reload()">أعد المحاولة</a>.</div>';});
}
let routeTok=0;
function setTitle(home){const h=$('#app h1, #app h2');document.title=(h&&!home?h.textContent.trim()+' | ':'')+'منصة الاختبار الوطني';}

/* ---------- التوجيه ---------- */
let examState=null, timerId=null;
const parseHash=()=>{const raw=location.hash.replace(/^#\/?/,'');const [path,qs]=raw.split('?');return {parts:path.split('/'),q:new URLSearchParams(qs||'')};};
function setFocus(on){document.body.classList.toggle('focus',!!on);}
function route(){
 routeTok++;
 const {parts,q}=parseHash();const r=parts[0]||'home';
 if(examState&&examState.running&&r!=='exam'){
  if(!confirm('سيتم إلغاء الامتحان التجريبي الجاري. هل أنت متأكد؟')){history.replaceState(null,'','#/exam');return;}
  stopExam(true);
 }
 if(r!=='exam'&&r!=='quiz')setFocus(false);
 $$('#nav a').forEach(a=>{const on=a.dataset.r===r||(r==='exam'&&a.dataset.r==='mock')||(r==='result'&&a.dataset.r==='progress')||(r==='glossary'&&a.dataset.r==='study');a.classList.toggle('active',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
 $('#nav').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');
 window.scrollTo(0,0);
 const V={home:viewHome,guide:()=>viewGuide(q.get('sec')),plan:viewPlan,study:()=>viewStudy(parts[1],q.get('tab')),glossary:viewGlossary,
  practice:()=>viewPractice(parts[1],q),mock:()=>viewMockSetup(q),exam:viewExam,result:()=>viewResult(parts[1]),files:viewFiles,progress:viewProgress};
 (V[r]||viewHome)();
 setTitle(r==='home');
 app.focus({preventScroll:true});
}
window.addEventListener('hashchange',route);
$('#menuBtn').onclick=()=>{const n=$('#nav');n.classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',n.classList.contains('open'));};
$('#themeBtn').onclick=()=>{const t=theme.get()==='dark'?'light':'dark';store.set('theme',t);theme.apply(t);};
window.addEventListener('beforeunload',e=>{if(examState&&examState.running){saveLive();e.preventDefault();e.returnValue='';}});

const cite=keys=>keys&&keys.length?`<span class="cite">المصدر: ${keys.map(k=>G.S[k]?`<a href="${G.S[k].u}" target="_blank" rel="noopener">${esc(G.S[k].n)}</a>`:'').join('، ')}</span>`:'';
const badge=k=>k==='off'?'<span class="src off">رسمي</span>':k==='tg'?'<span class="src tg">تجارب الطلبة</span>':k==='tip'?'<span class="src tip">نصيحة</span>':'';

/* ---------- الرئيسية ---------- */
function viewHome(){
 const total=META.total, st=streak(), tc=todayCount(), gl=goal(), plan=store.get('plan',null);
 app.innerHTML=`
 <section class="hero"><div class="wrap hero-grid fade">
  <div>
   <span class="eyebrow">العام الدراسي 2026 – 2027 • مجاني ويعمل دون اتصال</span>
   <h1>استعد للاختبار الوطني الموحد بهدوء وثقة</h1>
   <p class="lead">كل ما تحتاجه للدراسات العليا في العراق في مكان واحد: دليل موثّق للحجز والدرجات، ملخصات وأوراق مراجعة، ${total.toLocaleString('en-US')} سؤالاً مع الشرح، وامتحان تجريبي يحاكي الوقت وعدد الأسئلة.</p>
   <div class="btns"><a class="btn btn-pri btn-lg" href="#/practice">ابدأ التدريب</a><a class="btn btn-ghost btn-lg" href="#/guide">دليل الاختبار</a></div>
  </div>
  <div class="card pad-lg">
   <div class="today">
    <div class="ring" style="--v:${Math.min(100,pct(tc,gl))}" aria-label="هدف اليوم"><div>${tc}/${gl}</div></div>
    <div style="flex:1;min-width:160px"><b>هدف اليوم</b><div class="muted small">${tc>=gl?'أحسنت! أكملت هدف اليوم.':`أجب عن ${gl-tc} سؤالاً آخر لتحقيق هدفك.`}</div>
     <div class="small">سلسلة الأيام المتتالية: <b>${st}</b> ${st===1?'يوم':'أيام'}</div></div>
   </div>
   <div class="btns mt"><a class="btn btn-soft btn-sm" href="#/plan">${plan?'تابع خطة المذاكرة':'اختر خطة مذاكرة'}</a><a class="btn btn-soft btn-sm" href="#/progress">لوحة التقدّم</a><button class="btn btn-soft btn-sm" data-pomo>مؤقّت التركيز</button></div>
  </div>
 </div></section>

 <section class="sec"><div class="wrap">
  <div class="grid g4">
   <div class="kpi"><b>3</b><span>اختبارات منفصلة: عربي، إنكليزي، حاسوب</span></div>
   <div class="kpi"><b>60</b><span>دقيقة لكل اختبار</span></div>
   <div class="kpi"><b>60 · 40 · 40</b><span>عدد أسئلة العربي · الإنكليزي · الحاسوب</span></div>
   <div class="kpi"><b>50+</b><span>أدنى درجة اجتياز من 100 (حسب التخصص)</span></div>
  </div>
 </div></section>

 <section class="sec" style="padding-top:0"><div class="wrap">
  <h2>المواد</h2><p class="sub">لكل مادة: ملخص، ورقة مراجعة سريعة، تدريب فوري بالشرح، وامتحان تجريبي.</p>
  <div class="grid g3">${ORDER.map(s=>{const S=SUBJ[s],m=META.subjects[s],ss=subjStats(s),b=bestOf(s);return `
   <div class="card subj-card"><div class="ic" aria-hidden="true">${S.icon}</div>
    <h3>${S.name} ${S.code?`<span class="tag ltr">${S.code}</span>`:''}</h3>
    <div class="meta"><span class="tag">${S.n} سؤال • ${S.min} دقيقة</span><span class="tag pri">${m.count} سؤال تدريبي</span></div>
    <div class="small muted">${ss.a?`دقّتك ${pct(ss.c,ss.a)}% في ${ss.a} سؤال`:'لم تبدأ التدريب بعد'}${b!==null?` • أفضل امتحان ${fmt1(b)}`:''}</div>
    <div class="bar" aria-hidden="true"><i style="width:${ss.a?pct(ss.c,ss.a):0}%"></i></div>
    <div class="btns"><a class="btn btn-sm btn-pri" href="#/practice/${s}">تدريب</a><a class="btn btn-sm btn-ghost" href="#/study/${s}">الملخص</a><a class="btn btn-sm btn-ghost" href="#/mock?s=${s}">امتحان</a></div>
   </div>`;}).join('')}</div>
 </div></section>

 <section class="sec" style="padding-top:0"><div class="wrap grid g2">
  <div class="card"><h3>ابدأ من هنا</h3>
   <ol class="steps">
    <li><h4>اعرف ما المطلوب منك</h4><div class="muted small">اقرأ <a href="#/guide">دليل الاختبار</a>: درجة الاجتياز لتخصصك، الحجز، الرسوم، وما تحضره يوم الاختبار.</div></li>
    <li><h4>اختر خطة</h4><div class="muted small"><a href="#/plan">خطة أسبوعين أو 30 يوماً</a> بمهام يومية واضحة تحفظ تقدّمك.</div></li>
    <li><h4>تدرّب بتركيز</h4><div class="muted small">سؤال واحد في الشاشة، شرح فوري، واختصارات لوحة المفاتيح. استخدم مؤقّت التركيز (25 دقيقة).</div></li>
    <li><h4>قِس جاهزيتك</h4><div class="muted small">قدّم <a href="#/mock">امتحاناً تجريبياً</a> وراجع المواضيع الضعيفة في <a href="#/progress">لوحة التقدّم</a>.</div></li>
   </ol></div>
  <div class="card"><h3>حقائق سريعة</h3>
   <ul class="facts">${G.overview.slice(3,8).map(f=>`<li><b class="k">${esc(f[0])} ${badge(f[2])}</b><span class="muted small">${esc(f[1])}</span></li>`).join('')}</ul>
   <a class="btn btn-soft btn-sm mt" href="#/guide">الدليل الكامل مع المصادر</a></div>
 </div></section>`;
}

/* ---------- دليل الاختبار ---------- */
const GSECS=[['overview','نظرة عامة'],['who','الأهلية'],['booking','خطوات الحجز'],['fees','الرسوم والمواعيد'],['format','شكل الاختبار والمنهج'],['pass','درجات الاجتياز'],['day','يوم الاختبار'],['cert','النتيجة والشهادة'],['faq','أسئلة شائعة'],['sources','المصادر']];
function passTable(s){const P=G.pass[s];return `<div style="overflow:auto"><table class="t"><tr><th>نوع الدراسة / التخصص</th><th>درجة الاجتياز</th>${P.cefr?'<th>CEFR</th>':''}</tr>${P.rows.map(r=>`<tr><td>${esc(r[0])}</td><td><b>${r[1]}</b></td>${P.cefr?`<td class="ltr">${r[2]}</td>`:''}</tr>`).join('')}</table></div>${P.note?`<p class="small muted mt">${esc(P.note)}</p>`:''}<div class="mt">${cite(P.src)}</div>`;}
function viewGuide(sec){
 app.innerHTML=`<section class="page-head"><div class="wrap fade"><span class="eyebrow">آخر مراجعة: ${G.updated}</span><h2 style="margin-top:8px">دليل الاختبار الوطني الموحد</h2>
  <p class="sub">معلومات موثّقة من مواقع الجامعات وموقع الحجز وإعلانات الوزارة. كل معلومة مُعلَّمة: <span class="src off">رسمي</span> <span class="src tg">تجارب الطلبة</span> <span class="src tip">نصيحة</span>. التفاصيل تختلف أحياناً بين المراكز، فاعتمد دائماً إعلان مركزك.</p></div></section>
 <div class="wrap"><nav class="toc-tabs" aria-label="أقسام الدليل">${GSECS.map(s=>`<a class="chip" href="#/guide?sec=${s[0]}" data-sec="${s[0]}">${s[1]}</a>`).join('')}</nav>
 <div class="grid" style="gap:22px">
  <div class="card" id="g-overview"><h3>نظرة عامة</h3><ul class="facts">${G.overview.map(f=>`<li><b class="k">${esc(f[0])} ${badge(f[2])}</b><div>${esc(f[1])}</div>${cite(f[3])}</li>`).join('')}</ul></div>
  <div class="card" id="g-who"><h3>من يجب عليه أداء الاختبار؟</h3><ul class="facts">${G.eligibility.map(f=>`<li><b class="k">${esc(f[0])} ${badge(f[2])}</b><div>${esc(f[1])}</div>${cite(f[3])}</li>`).join('')}</ul></div>
  <div class="card" id="g-booking"><h3>خطوات الحجز خطوة بخطوة</h3><ol class="steps">${G.booking.map(b=>`<li><h4>${esc(b.h)}</h4><div>${b.b}</div>${cite(b.src)}</li>`).join('')}</ol>
   <div class="note">احذر من الحسابات والإعلانات التي تطلب مالاً مقابل «الحجز وإنشاء الحساب وسحب الشهادة»؛ كل ذلك تستطيع فعله بنفسك مجاناً، والرسوم الرسمية تُدفع في المركز فقط.</div>
   <div class="btns mt"><a class="btn btn-pri" href="https://inpt.rdd.edu.iq" target="_blank" rel="noopener">موقع الحجز الرسمي</a><a class="btn btn-ghost" href="https://inpt.rdd.edu.iq/EducationalVideos" target="_blank" rel="noopener">فيديو إنشاء الحساب</a></div></div>
  <div class="card" id="g-fees"><h3>الرسوم والمواعيد</h3>
   <div class="grid g2"><div class="kpi"><b>30,000</b><span>دينار — المحاولة الأولى لكل مادة</span></div><div class="kpi"><b>20,000</b><span>دينار — كل محاولة لاحقة</span></div></div>
   <p class="mt">الدفع في المركز، وفي مراكز عديدة بالبطاقة الإلكترونية فقط ${badge('off')}</p>
   <h4 class="mt">مثال على الجدول الأسبوعي</h4>
   <div style="overflow:auto"><table class="t"><tr><th>اليوم</th><th>10 صباحاً</th><th>12 ظهراً</th></tr>${G.schedule.rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table></div>
   <p class="small muted mt">${esc(G.schedule.note)}</p>${cite(['samarra','uob','nahrain','kirkuk','karbala'])}</div>
  <div class="card" id="g-format"><h3>شكل الاختبار والمنهج الرسمي</h3>
   <div style="overflow:auto"><table class="t"><tr><th>الاختبار</th><th>عدد الأسئلة</th><th>المدة</th><th>اللغة</th></tr>
    <tr><td>اللغة العربية</td><td>60</td><td>60 دقيقة</td><td>العربية</td></tr><tr><td>اللغة الإنكليزية (INELT)</td><td>40</td><td>60 دقيقة</td><td>الإنكليزية</td></tr><tr><td>الحاسوب (INCPT)</td><td>40</td><td>60 دقيقة</td><td>الإنكليزية</td></tr></table></div>
   <div class="grid g3 mt">${ORDER.map(s=>{const y=G.syllabus[s];return `<div><h4>${SUBJ[s].name}</h4><ul class="small" style="padding-inline-start:18px;margin:0">${y.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>${y.note?`<p class="small muted">${esc(y.note)} ${badge('tg')}</p>`:''}${cite(y.src)}</div>`;}).join('')}</div></div>
  <div class="card" id="g-pass"><h3>درجات الاجتياز (من 100)</h3>
   <div class="tabs" id="passTabs" role="tablist">${ORDER.map((s,i)=>`<button role="tab" data-s="${s}" class="${i?'':'on'}" aria-selected="${!i}">${SUBJ[s].name}</button>`).join('')}</div>
   <div id="passTable" class="mt"></div></div>
  <div class="card" id="g-day"><h3>يوم الاختبار</h3><div class="grid g3">
   <div><h4>أحضر معك</h4><ul class="facts">${G.day.bring.map(x=>`<li>${esc(x[0])} ${badge(x[1])}</li>`).join('')}</ul></div>
   <div><h4>ممنوع إدخاله</h4><ul class="facts">${G.day.banned.map(x=>`<li>${esc(x[0])} ${badge(x[1])}</li>`).join('')}</ul></div>
   <div><h4>مخالفات تحرمك من التقديم ${badge('off')}</h4><ul class="facts">${G.day.cheating.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>
   ${cite(['samarra','inpt','mtu'])}
   <h4 class="mt">نصائح للأداء ${badge('tip')}</h4><ul>${G.day.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
  <div class="card" id="g-cert"><h3>النتيجة والشهادة</h3><ul class="facts">
   <li><b class="k">الدرجة ${badge('tg')}</b>يذكر الطلبة أن الدرجة تظهر بعد انتهاء الاختبار مباشرة.</li>
   <li><b class="k">طباعة الشهادة ${badge('off')}</b>من حسابك على موقع الحجز ← «شهادات الاختبار» ← «تأكيد البيانات لطباعة الشهادة». ${cite(['inpt'])}</li>
   <li><b class="k">الجهة المانحة ${badge('off')}</b>تُمنح الشهادات من مراكز التعليم المستمر ومراكز الحاسبة في الجامعات الحكومية والأهلية حصراً. ${cite(['samarra'])}</li>
   <li><b class="k">الصلاحية ${badge('off')}</b>سنتان. ${cite(['uob','samarra'])}</li>
   <li><b class="k">إن لم تجتز</b>احجز محاولة جديدة من الحساب نفسه (20,000 دينار)، وركّز على مواضيعك الضعيفة في <a href="#/progress">لوحة التقدّم</a>.</li></ul></div>
  <div id="g-faq"><h3>أسئلة شائعة</h3>${G.faq.map(f=>`<details class="acc"><summary>${esc(f[0])}</summary><div>${esc(f[1])} ${badge(f[2])}<div>${cite(f[3])}</div></div></details>`).join('')}</div>
  <div class="card" id="g-sources"><h3>المصادر</h3><ul>${Object.values(G.S).map(s=>`<li><a href="${s.u}" target="_blank" rel="noopener">${esc(s.n)}</a></li>`).join('')}</ul>
   <p class="small muted">بنك الأسئلة: نماذج كتبناها على نمط الاختبار + أسئلة نقلها الطلبة في قنوات تيليجرام العامة (@watani8 وغيرها) وملفات PDF منشورة فيها، بعد مراجعة كل إجابة. التفاصيل في ملف RESEARCH-NOTES.md في المستودع.</p></div>
 </div></div>`;
 const draw=s=>{$('#passTable').innerHTML=passTable(s);};draw('arabic');
 $$('#passTabs button').forEach(b=>b.onclick=()=>{$$('#passTabs button').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false');});b.classList.add('on');b.setAttribute('aria-selected','true');draw(b.dataset.s);});
 $$('.toc-tabs a').forEach(a=>a.onclick=e=>{e.preventDefault();const el=$('#g-'+a.dataset.sec);if(el){const y=el.getBoundingClientRect().top+scrollY-120;scrollTo({top:y,behavior:'smooth'});}history.replaceState(null,'','#/guide?sec='+a.dataset.sec);});
 if(sec&&$('#g-'+sec))setTimeout(()=>{const el=$('#g-'+sec);scrollTo({top:el.getBoundingClientRect().top+scrollY-120});},30);
}

/* ---------- خطة المذاكرة ---------- */
function viewPlan(){
 const cur=store.get('plan',null), done=store.get('planDone',{});
 const render=()=>{
  const id=store.get('plan',null);
  if(!id){app.innerHTML=`<section class="page-head"><div class="wrap fade"><h2>خطة المذاكرة</h2><p class="sub">اختر خطة تناسب الوقت المتبقي على موعدك. تُحفظ مهامك المنجزة على جهازك.</p>
   <div class="grid g2 mt">${Object.entries(G.plans).map(([k,p])=>`<div class="card subj-card"><h3>${esc(p.name)}</h3><p class="muted">${esc(p.desc)}</p><p class="small">${p.days.length} يوماً • ${p.days.reduce((a,d)=>a+d[1].length,0)} مهمة</p><div class="btns"><button class="btn btn-pri" data-plan="${k}">ابدأ هذه الخطة</button></div></div>`).join('')}</div>
   <div class="note info mt">نصيحة: ذاكر في جلسات تركيز قصيرة (25 دقيقة ثم 5 دقائق راحة) باستخدام <button class="btn btn-sm btn-soft" data-pomo>مؤقّت التركيز</button></div></div></section>`;
   $$('[data-plan]').forEach(b=>b.onclick=()=>{store.set('plan',b.dataset.plan);store.set('planStart',dayKey());render();});return;}
  const p=G.plans[id], D=store.get('planDone',{}), total=p.days.reduce((a,d)=>a+d[1].length,0), ndone=Object.keys(D).filter(k=>k.startsWith(id+':')&&D[k]).length;
  const firstOpen=p.days.findIndex((d,i)=>d[1].some((t,j)=>!D[id+':'+i+':'+j]));
  app.innerHTML=`<section class="page-head"><div class="wrap fade" style="max-width:860px"><span class="eyebrow">${esc(p.name)}</span><h2 style="margin-top:8px">خطة المذاكرة</h2>
   <div class="card"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><b>أنجزت ${ndone} من ${total} مهمة</b><span class="muted small">${pct(ndone,total)}%</span></div><div class="bar mt" style="margin-top:8px"><i style="width:${pct(ndone,total)}%"></i></div>
   <div class="btns mt">${firstOpen>=0?`<a class="btn btn-pri btn-sm" href="#day${firstOpen}" id="jump">انتقل لليوم الحالي (${firstOpen+1})</a>`:'<span class="tag ok">أكملت الخطة — بالتوفيق في الاختبار!</span>'}<button class="btn btn-ghost btn-sm" id="chg">تغيير الخطة</button></div></div>
   <div class="mt">${p.days.map((d,i)=>{const all=d[1].every((t,j)=>D[id+':'+i+':'+j]);return `<div class="plan-day ${all?'done':''}" id="day${i}"><h4><span>${esc(d[0])}</span>${all?'<span class="tag ok">تم</span>':''}</h4>
    ${d[1].map((t,j)=>{const k=id+':'+i+':'+j;return `<label class="task ${D[k]?'ck':''}"><input type="checkbox" data-k="${k}" ${D[k]?'checked':''}><span>${esc(t[0])} ${t[1]?`<a href="${t[1]}">افتح</a>`:''}</span></label>`;}).join('')}</div>`;}).join('')}</div></div></section>`;
  $$('.task input').forEach(c=>c.onchange=()=>{const D2=store.get('planDone',{});D2[c.dataset.k]=c.checked;store.set('planDone',D2);c.parentElement.classList.toggle('ck',c.checked);});
  const j=$('#jump');if(j)j.onclick=e=>{e.preventDefault();const el=$('#day'+firstOpen);el&&scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'smooth'});};
  $('#chg').onclick=()=>{if(confirm('تغيير الخطة؟ ستبقى مهامك المنجزة محفوظة.')){store.del('plan');render();}};
 };
 render();
}

/* ---------- الملخصات وأوراق المراجعة ---------- */
function viewStudy(s,tab){
 if(!SUBJ[s])s='arabic';
 const N=NOTES[s];tab=tab==='cheat'?'cheat':'notes';
 app.innerHTML=`<section class="page-head"><div class="wrap fade">
  <div class="tabs" role="tablist" aria-label="المادة">${ORDER.map(x=>`<button role="tab" aria-selected="${x===s}" class="${x===s?'on':''}" data-go="#/study/${x}${tab==='cheat'?'?tab=cheat':''}">${SUBJ[x].name}</button>`).join('')}</div>
  <h2 class="mt">${tab==='cheat'?'ورقة مراجعة سريعة — '+SUBJ[s].name:esc(N.title)}</h2><p class="sub">${tab==='cheat'?'أهم القواعد والاختصارات في صفحة واحدة — راجعها قبل الاختبار مباشرة.':esc(N.sub)}</p>
  <div class="btns"><a class="chip ${tab==='notes'?'on':''}" href="#/study/${s}">الملخص الكامل</a><a class="chip ${tab==='cheat'?'on':''}" href="#/study/${s}?tab=cheat">ورقة المراجعة</a><a class="chip" href="#/glossary">المصطلحات</a><a class="chip" href="#/practice/${s}">تدرّب على ${SUBJ[s].short}</a><a class="chip" href="files/${s}-notes.pdf" download>تحميل PDF</a></div>
 </div></section>
 <div class="wrap mt">${tab==='cheat'?G.cheats[s]:`<div class="study-layout">
   <aside class="card toc no-print" aria-label="المحتويات"><b>المحتويات</b>${N.sections.map((x,i)=>`<a href="javascript:void(0)" data-to="n${i}">${esc(x.h)}</a>`).join('')}</aside>
   <div>${N.sections.map((x,i)=>`<div class="card note-sec" id="n${i}"><h3>${esc(x.h)}</h3><div class="${s==='english'?'ltr':''}">${x.html}</div></div>`).join('')}</div></div>`}</div>`;
 $$('[data-go]').forEach(b=>b.onclick=()=>location.hash=b.dataset.go);
 $$('[data-to]').forEach(a=>a.onclick=()=>{const el=document.getElementById(a.dataset.to);scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'smooth'});});
}
function viewGlossary(){
 const cats={all:'الكل',exam:'الاختبار',computer:'الحاسوب',english:'الإنكليزي',arabic:'العربي'};let cat='all',qq='';
 app.innerHTML=`<section class="page-head"><div class="wrap fade" style="max-width:900px"><h2>المصطلحات</h2><p class="sub">${G.glossary.length} مصطلحاً تحتاجها في الاختبار ودليل الحجز، مع شرح مختصر.</p>
  <input type="search" id="gq" placeholder="ابحث عن مصطلح… مثل RAM أو الممنوع من الصرف" aria-label="بحث في المصطلحات">
  <div class="btns mt" id="gc">${Object.entries(cats).map(([k,v])=>`<button class="chip ${k==='all'?'on':''}" data-c="${k}">${v}</button>`).join('')}</div>
  <div class="card mt" id="gl"></div></div></section>`;
 const draw=()=>{const n=qq.trim().toLowerCase();const L=G.glossary.filter(g=>(cat==='all'||g[2]===cat)&&(!n||(g[0]+' '+g[1]).toLowerCase().includes(n)));
  $('#gl').innerHTML=L.length?L.map(g=>`<div class="gl-item"><b class="${/[a-z]/i.test(g[0][0])?'ltr':''}">${esc(g[0])}</b><span>${esc(g[1])}</span></div>`).join(''):'<div class="empty">لا نتائج</div>';};
 $('#gq').oninput=e=>{qq=e.target.value;draw();};
 $$('#gc .chip').forEach(b=>b.onclick=()=>{$$('#gc .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.c;draw();});
 draw();
}

/* ---------- الملفات ---------- */
function viewFiles(){
 const F=[['arabic-notes','ملخص اللغة العربية','النحو والصرف والإملاء والثقافة اللغوية والبلاغة'],['english-notes','English Summary (INELT)','Grammar, functions, conversation, reading'],['computer-notes','ملخص الحاسوب (INCPT)','Windows, Word, Excel, PowerPoint, Internet, AI'],
  ['arabic-bank','بنك أسئلة العربي مع الإجابات',META.subjects.arabic.count+' سؤالاً مع الإجابة والشرح'],['english-bank','English Question Bank + Answers',META.subjects.english.count+' questions with answers'],['computer-bank','بنك أسئلة الحاسوب مع الإجابات',META.subjects.computer.count+' سؤالاً (بالإنكليزية) مع الشرح']];
 app.innerHTML=`<section class="page-head"><div class="wrap fade"><h2>ملفات للتحميل</h2><p class="sub">ملفات PDF للطباعة أو المذاكرة على الهاتف دون إنترنت.</p>
  <div class="grid g3">${F.map(f=>`<div class="card files-card"><div class="fi">PDF</div><div style="flex:1"><h3 style="font-size:16.5px;margin:0">${f[1]}</h3><div class="muted small">${f[2]}</div>
   <div class="btns" style="margin-top:10px"><a class="btn btn-sm btn-pri" href="files/${f[0]}.pdf" download>تحميل</a><a class="btn btn-sm btn-ghost" href="files/${f[0]}.pdf" target="_blank" rel="noopener">عرض</a></div></div></div>`).join('')}</div>
  <div class="note mt">الأسئلة نماذج تدريبية على نمط الاختبار الوطني ومراجَعة بعناية، وليست أسئلة الوزارة الرسمية.</div></div></section>`;
}

/* ---------- عرض سؤال ---------- */
const srcLink=q=>q.src?`<a class="src-link" href="${q.src}" target="_blank" rel="noopener">المصدر: تيليجرام <bdi dir="ltr">${esc(q.src.replace('https://t.me/','@'))}</bdi></a>`:q.srcName?`<span class="src-link">المصدر: ملف <bdi>«${esc(q.srcName)}»</bdi></span>`:'';
function fmtQ(q){let t=esc(q.q);if(q.ltr){const re=/(^|[\s"“.!?])((?:Man|Woman|Boy|Girl|Teacher|Student|Speaker \d|[A-Z][a-z]{2,10}))\s?:\s/g;const m=t.match(re);if(m&&m.length>=2)t=t.replace(re,(a,b,c,off)=>off===0?a:b.trimEnd()+'\n'+c+': ').replace(/\s—\s(?=What|Which|How|Why)/,'\n');}return t;}
function qHTML(q,opts,cls,idx,total,extra){
 const L=q.ltr, keys=L?KEYS_EN:KEYS_AR, P=q.p&&PASSAGES[q.p];
 return `<div class="qcard fade">
  <div class="qmeta"><span>السؤال <b>${idx+1}</b> من ${total}</span><span class="tag">${tFull(q.t)}</span>${extra||''}</div>
  ${P?`<div class="passage ltr" tabindex="0"><b>Read the passage: ${esc(P.title)}</b>${esc(P.text)}</div>`:''}
  <div class="qtext ${L?'ltr':''}" id="qtext">${fmtQ(q)}</div>
  <div class="opts ${L?'ltr':''}" role="group" aria-labelledby="qtext">${opts.map((o,i)=>`<button class="opt ${cls(i)}" data-i="${i}"><span class="k" aria-hidden="true">${keys[i]}</span><span class="ot">${esc(o.text)}</span></button>`).join('')}</div>
  <div id="exp" aria-live="polite"></div></div>`;
}
const prepOpts=q=>shuffle(q.o.map((t,i)=>({text:t,correct:i===0})));
const keyIndex=(e,n)=>{const k=e.key;let i=-1;if(/^[1-5]$/.test(k))i=+k-1;else{const u=k.toUpperCase();i=KEYS_EN.indexOf(u);if(i<0)i=KEYS_AR.indexOf(k);}return i>=0&&i<n?i:-1;};
let keyHandler=null;
document.addEventListener('keydown',e=>{if(!keyHandler)return;if(e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='SELECT'||t.tagName==='TEXTAREA'))return;if($('.modal-bg'))return;keyHandler(e);});
function focusBar(title,right,progress){return `<div class="focus-bar"><div class="wrap"><button class="icon-btn" id="fbExit" aria-label="خروج">${ICON.x}</button><span class="ttl">${title}</span><div class="prog"><div class="bar"><i style="width:${progress}%"></i></div></div>${right}</div></div>`;}

/* ---------- التدريب ---------- */
function viewPractice(s,q){
 keyHandler=null;
 if(!s||!SUBJ[s]){
  app.innerHTML=`<section class="page-head"><div class="wrap fade"><h2>التدريب الفوري</h2><p class="sub">سؤال واحد في الشاشة، والتصحيح والشرح فور الإجابة. يُحفظ أداؤك لتحديد مواضيعك الضعيفة.</p>
   <div class="grid g3">${ORDER.map(x=>{const st=subjStats(x),w=(getWrong()[x]||[]).length;return `<div class="card subj-card"><div class="ic">${SUBJ[x].icon}</div><h3>${SUBJ[x].name}</h3>
   <p class="muted small" style="margin:0">${st.a?`أجبت ${st.a} سؤالاً بدقة ${pct(st.c,st.a)}%`:'ابدأ أول تدريب لك'}${w?` • ${w} للمراجعة`:''}</p><div class="bar"><i style="width:${pct(st.c,st.a)}%"></i></div>
   <div class="btns"><a class="btn btn-pri" href="#/practice/${x}">اختر الموضوع</a>${w?`<a class="btn btn-ghost" href="#/practice/${x}?t=__wrong">أخطائي</a>`:''}</div></div>`;}).join('')}</div></div></section>`;
  return;
 }
 withBank(s,()=>practiceSetup(s,q));
}
function practiceSetup(s,q){
 const S=SUBJ[s], B=BANK[s], topics=[...new Set(B.map(x=>x.t))], wrongN=(getWrong()[s]||[]).length, st=subjStats(s).topics;
 const pre=q&&q.get('t');
 let sel={topic:pre&&(topics.includes(pre)||pre==='__wrong'&&wrongN)?pre:'all',count:+(store.get('pcount',10)),order:'smart'};
 if(pre&&sel.topic===pre&&q.get('go')!=='0'){return startPractice(s,sel);}
 app.innerHTML=`<section class="page-head"><div class="wrap fade" style="max-width:820px">
  <div class="tabs">${ORDER.map(x=>`<button class="${x===s?'on':''}" data-go="#/practice/${x}">${SUBJ[x].short}</button>`).join('')}</div>
  <h2 class="mt">تدريب: ${S.name}</h2><p class="sub">اختر الموضوع وعدد الأسئلة. الأسئلة التي أخطأت فيها تظهر لك أولاً في «الذكي».</p>
  <div class="card">
   <div class="field"><label id="lt">الموضوع</label><div class="choice-grid" id="tp" role="radiogroup" aria-labelledby="lt">
    <button class="choice" data-v="all">كل المواضيع<small>${B.length} سؤال</small></button>
    ${topics.map(t=>{const x=st[t];return `<button class="choice" data-v="${esc(t)}">${esc(tName(t))}<small>${B.filter(z=>z.t===t).length} سؤال${x&&x.a?` • دقتك ${pct(x.c,x.a)}%`:''}</small></button>`;}).join('')}
    <button class="choice" data-v="__wrong" ${wrongN?'':'disabled'}>أخطائي السابقة<small>${wrongN} سؤال</small></button>
   </div></div>
   <div class="field"><label>عدد الأسئلة</label><div class="choice-grid" id="ct">${[10,20,30,50].map(n=>`<button class="choice" data-v="${n}">${n}</button>`).join('')}</div></div>
   <div class="field"><label>الترتيب</label><div class="choice-grid" id="od"><button class="choice" data-v="smart">ذكي<small>غير المحلول والأخطاء أولاً</small></button><button class="choice" data-v="random">عشوائي</button></div></div>
   <button class="btn btn-pri btn-lg" id="go" style="width:100%">ابدأ التدريب</button>
   <p class="kbd-hint">في وضع التركيز: <kbd>1</kbd>–<kbd>4</kbd> للإجابة • <kbd>Enter</kbd> للتالي • <kbd>Esc</kbd> للخروج</p>
  </div></div></section>`;
 const mark=()=>{$$('#tp .choice').forEach(b=>b.classList.toggle('on',b.dataset.v===sel.topic));$$('#ct .choice').forEach(b=>b.classList.toggle('on',+b.dataset.v===sel.count));$$('#od .choice').forEach(b=>b.classList.toggle('on',b.dataset.v===sel.order));};
 $$('#tp .choice').forEach(b=>b.onclick=()=>{if(!b.disabled){sel.topic=b.dataset.v;mark();}});
 $$('#ct .choice').forEach(b=>b.onclick=()=>{sel.count=+b.dataset.v;store.set('pcount',sel.count);mark();});
 $$('#od .choice').forEach(b=>b.onclick=()=>{sel.order=b.dataset.v;mark();});
 $$('[data-go]').forEach(b=>b.onclick=()=>location.hash=b.dataset.go);
 mark();
 $('#go').onclick=()=>startPractice(s,sel);
}
function startPractice(s,sel){
 let pool=BANK[s];const W=new Set(getWrong()[s]||[]), seen=new Set(store.get('seen',{})[s]||[]);
 if(sel.topic==='__wrong')pool=pool.filter(x=>W.has(x.id));else if(sel.topic!=='all')pool=pool.filter(x=>x.t===sel.topic);
 pool=shuffle(pool);
 if(sel.order!=='random'){const rank=x=>W.has(x.id)?0:seen.has(x.id)?2:1;pool.sort((a,b)=>rank(a)-rank(b));}
 runPractice(s,pool.slice(0,sel.count||10),sel);
}
function runPractice(s,qs,sel){
 let i=0,correct=0,answered=false;setFocus(true);
 const seenAdd=id=>{const S2=store.get('seen',{});const a=new Set(S2[s]||[]);a.add(id);S2[s]=[...a].slice(-3000);store.set('seen',S2);};
 const draw=()=>{
  if(i>=qs.length)return finish();
  answered=false;const q=qs[i], opts=prepOpts(q);
  app.innerHTML=focusBar(`تدريب ${SUBJ[s].short}`,`<span class="count">${i+1}/${qs.length}</span><span class="tag ok">✓ ${correct}</span><span class="tag bad">✗ ${i-correct}</span>`,i/qs.length*100)+
   `<div class="wrap"><div class="q-wrap">${qHTML(q,opts,()=>'',i,qs.length)}
   <div class="qnav-row"><span></span><button class="btn btn-pri" id="next" hidden>${i+1<qs.length?'التالي':'عرض النتيجة'}</button></div>
   <p class="kbd-hint"><kbd>1</kbd>–<kbd>${opts.length}</kbd> للإجابة • <kbd>Enter</kbd> للتالي • <kbd>Esc</kbd> للخروج</p></div></div>`;
  const choose=k=>{
   if(answered)return;answered=true;const ok=opts[k].correct;
   $$('.opt').forEach((x,j)=>{x.disabled=true;if(opts[j].correct)x.classList.add('right');});
   const b=$$('.opt')[k];if(!ok)b.classList.add('wrong');else correct++;
   record(s,q.t,ok);markWrong(s,q.id,!ok);seenAdd(q.id);
   $('#exp').innerHTML=`<div class="explain ${ok?'ok':'bad'}"><b>${ok?'إجابة صحيحة ✓':'إجابة خاطئة'}</b> ${ok?'':`— الصحيح: <b class="${q.ltr?'ltr':''}">${esc(q.o[0])}</b>`}<div>${esc(q.e)}</div>${srcLink(q)}</div>`;
   const nx=$('#next');nx.hidden=false;nx.focus({preventScroll:true});
   $$('.focus-bar .tag')[0].textContent='✓ '+correct;$$('.focus-bar .tag')[1].textContent='✗ '+(i+1-correct);
  };
  $$('.opt').forEach(b=>b.onclick=()=>choose(+b.dataset.i));
  $('#next').onclick=()=>{i++;draw();scrollTo(0,0);};
  $('#fbExit').onclick=()=>{const any=i>0||answered;if(any&&!confirm('إنهاء التدريب وعرض النتيجة؟'))return;keyHandler=null;if(any)finish();else{setFocus(false);practiceSetup(s,null);}};
  keyHandler=e=>{if(e.key==='Escape'){$('#fbExit').click();return;}if(e.key==='Enter'&&answered){e.preventDefault();$('#next').click();return;}const k=keyIndex(e,opts.length);if(k>=0){e.preventDefault();choose(k);}};
 };
 const finish=()=>{
  keyHandler=null;setFocus(false);const n=answered?i+1:i;const p=n?correct/n*100:0;
  app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:620px"><div class="card pad-lg center">
   <h2>انتهى التدريب</h2>
   <div class="gauge" style="--v:${p};--c:${p>=60?'var(--ok)':p>=50?'var(--flag)':'var(--bad)'}"><div><b>${Math.round(p)}%</b><span>${correct} من ${n}</span></div></div>
   <p class="muted mt">${p>=80?'ممتاز! أنت جاهز لتجربة امتحان كامل.':p>=60?'جيد، استمر وراجع أخطاءك.':'راجع ورقة المراجعة ثم أعد المحاولة — التكرار يصنع الفرق.'}</p>
   <div class="btns" style="justify-content:center"><button class="btn btn-pri" id="again">تدريب جديد</button><a class="btn btn-ghost" href="#/practice/${s}?t=__wrong">راجع أخطائي</a><a class="btn btn-ghost" href="#/study/${s}?tab=cheat">ورقة المراجعة</a></div>
   <p class="small muted mt">هدف اليوم: ${todayCount()}/${goal()} • السلسلة: ${streak()} يوم</p>
  </div></div></section>`;
  $('#again').onclick=()=>startPractice(s,sel||{topic:'all',count:10,order:'smart'});
 };
 draw();
}
window.runPractice=runPractice;

/* ---------- الامتحان التجريبي ---------- */
function viewMockSetup(q){
 keyHandler=null;
 const live=store.get('live',null);
 let sel={mode:SUBJ[q&&q.get('s')]?q.get('s'):(q&&q.get('s')==='full'?'full':'arabic'),req:Object.assign({arabic:50,english:50,computer:50},store.get('req',{})),hideTimer:store.get('hideTimer',false)};
 const render=()=>{
  const subs=sel.mode==='full'?ORDER:[sel.mode];
  app.innerHTML=`<section class="page-head"><div class="wrap fade" style="max-width:820px">
   <h2>الامتحان التجريبي</h2><p class="sub">يحاكي الاختبار الحقيقي: نفس عدد الأسئلة والوقت، وتوزيع على مواضيع المنهج، ولا تظهر الإجابات إلا بعد التسليم.</p>
   ${live&&live.running?`<div class="note info" style="margin-bottom:16px">لديك امتحان لم يكتمل. <button class="btn btn-sm btn-pri" id="resume">استئناف</button> <button class="btn btn-sm btn-ghost" id="discard">تجاهل</button></div>`:''}
   <div class="card">
    <div class="field"><label>اختر الامتحان</label><div class="choice-grid" id="md">
     ${ORDER.map(s=>`<button class="choice ${sel.mode===s?'on':''}" data-v="${s}">${SUBJ[s].name}<small>${SUBJ[s].n} سؤال • ${SUBJ[s].min} دقيقة</small></button>`).join('')}
     <button class="choice ${sel.mode==='full'?'on':''}" data-v="full">الاختبارات الثلاثة<small>140 سؤالاً • 3 أقسام × 60 دقيقة</small></button></div></div>
    ${subs.map(s=>`<div class="field"><label for="rq-${s}">درجة الاجتياز المطلوبة في ${SUBJ[s].name}</label>
     <select id="rq-${s}" data-s="${s}">${SUBJ[s].pass.map(p=>`<option value="${p[1]}" ${sel.req[s]==p[1]?'selected':''}>${esc(p[0])} — ${p[1]}</option>`).join('')}</select></div>`).join('')}
    <label class="task" style="margin-bottom:14px"><input type="checkbox" id="ht" ${sel.hideTimer?'checked':''}><span>إخفاء المؤقّت أثناء الحل (يظهر عند آخر 5 دقائق) — يقلل التوتر</span></label>
    <div class="note" style="margin-bottom:16px"><b>التعليمات:</b> يبدأ المؤقّت فور الضغط على «ابدأ». تنقّل بين الأسئلة بحرية، وعلّم ما تريد مراجعته. عند انتهاء الوقت يُسلَّم القسم تلقائياً. ${sel.mode==='full'?'لكل قسم 60 دقيقة مستقلة.':''}<br>اختصارات: <kbd>1</kbd>–<kbd>4</kbd> إجابة • <kbd>←</kbd> التالي • <kbd>→</kbd> السابق • <kbd>F</kbd> علامة مراجعة • <kbd>G</kbd> خريطة الأسئلة</div>
    <button class="btn btn-pri btn-lg" id="start" style="width:100%">ابدأ الامتحان الآن</button>
   </div></div></section>`;
  $$('#md .choice').forEach(b=>b.onclick=()=>{sel.mode=b.dataset.v;render();});
  $$('select[data-s]').forEach(x=>x.onchange=()=>{sel.req[x.dataset.s]=+x.value;store.set('req',sel.req);});
  $('#ht').onchange=e=>{sel.hideTimer=e.target.checked;store.set('hideTimer',sel.hideTimer);};
  $('#start').onclick=()=>{store.set('req',sel.req);withBank(subs,()=>startExam(subs,sel.req,sel.hideTimer));};
  const rs=$('#resume');if(rs)rs.onclick=()=>resumeExam();
  const ds=$('#discard');if(ds)ds.onclick=()=>{store.del('live');viewMockSetup(q);};
 };
 render();
}
/* توليد أسئلة الامتحان حسب هيكل الاختبار الحقيقي */
function pick(pool,n){return shuffle(pool).slice(0,n);}
function buildSection(s){
 const B=BANK[s], by=t=>B.filter(q=>q.t===t);
 let qs=[];
 if(s==='english'){
  const ok=Object.keys(PASSAGES).filter(p=>B.filter(q=>q.p===p).length>=5);
  const pass=shuffle(ok).slice(0,2);
  qs=[...pick(by('Grammar'),8),...pick(by('Vocabulary'),2),...pick(by('Language Functions'),10),...pick(by('Conversation'),10),...pass.flatMap(p=>pick(B.filter(q=>q.p===p),5))];
 }else if(s==='computer'){
  const plan={'Computer Basics':4,'Windows 10':8,'Security & Viruses':4,'MS Word 2016':8,'MS Excel 2016':6,'MS PowerPoint 2016':4,'Internet & Email':4,'Artificial Intelligence':2};
  Object.keys(plan).forEach(t=>qs.push(...pick(by(t),plan[t])));qs=shuffle(qs);
 }else{
  const plan={'النحو':24,'الصرف':10,'الإملاء':9,'الأخطاء اللغوية':5,'الثقافة اللغوية':8,'البلاغة والأساليب':4};
  Object.keys(plan).forEach(t=>qs.push(...pick(by(t),plan[t])));qs=shuffle(qs);
 }
 const ids=new Set(qs.map(q=>q.id));
 if(qs.length<SUBJ[s].n)qs.push(...pick(B.filter(q=>!ids.has(q.id)&&!q.p),SUBJ[s].n-qs.length));
 qs=qs.slice(0,SUBJ[s].n);
 return {subj:s,qs:qs.map(q=>({q,opts:prepOpts(q),ans:null,flag:false})),cur:0,dur:SUBJ[s].min*60,endAt:null,used:0,done:false};
}
window.__bs=buildSection;
function startExam(subs,req,hideTimer){
 examState={id:Date.now().toString(36),running:true,mode:subs.length>1?'full':subs[0],req,hideTimer:!!hideTimer,sections:subs.map(buildSection),si:0,start:Date.now()};
 saveLive();
 if(location.hash!=='#/exam'){history.pushState(null,'','#/exam');}
 viewExam();
}
function saveLive(){if(!examState)return;const st=examState;store.set('live',{id:st.id,running:st.running,mode:st.mode,req:st.req,hideTimer:st.hideTimer,si:st.si,start:st.start,
 sections:st.sections.map(sc=>({subj:sc.subj,cur:sc.cur,dur:sc.dur,endAt:sc.endAt,used:sc.used,done:sc.done,qs:sc.qs.map(x=>({id:x.q.id,o:x.opts.map(o=>o.text),ans:x.ans,flag:x.flag}))}))});}
function resumeExam(){
 const L=store.get('live',null);if(!L)return;
 withBank(L.sections.map(x=>x.subj),()=>{
  const byId={};L.sections.forEach(sc=>BANK[sc.subj].forEach(q=>byId[q.id]=q));
  examState=Object.assign({},L,{sections:L.sections.map(sc=>Object.assign({},sc,{qs:sc.qs.filter(x=>byId[x.id]).map(x=>{const q=byId[x.id];return {q,opts:x.o.map(t=>({text:t,correct:t===q.o[0]})),ans:x.ans,flag:x.flag};})}))});
  history.pushState(null,'','#/exam');viewExam();
 });
}
function stopExam(discard){clearInterval(timerId);timerId=null;if(examState)examState.running=false;if(discard)store.del('live');examState=null;}
const mmss=t=>{t=Math.max(0,Math.round(t));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');};
const left=sec=>sec.endAt?Math.max(0,(sec.endAt-Date.now())/1000):sec.dur;
function tick(){
 if(!examState)return;const sec=examState.sections[examState.si];const t=left(sec);sec.used=Math.min(sec.dur,sec.dur-t);
 const el=$('#timer');if(el){el.textContent=mmss(t);el.classList.toggle('low',t<=300);el.classList.toggle('hidden-t',examState.hideTimer&&t>300);}
 if(t<=0){clearInterval(timerId);timerId=null;toast('انتهى الوقت — تم تسليم القسم تلقائياً',3500);finishSection();}
}
function viewExam(){
 if(!examState||!examState.running){const L=store.get('live',null);if(L&&L.running){resumeExam();return;}location.hash='#/mock';return;}
 setFocus(true);
 const st=examState, sec=st.sections[st.si], S=SUBJ[sec.subj];
 if(!sec.endAt){sec.endAt=Date.now()+sec.dur*1000;saveLive();}
 if(!timerId)timerId=setInterval(tick,500);
 const it=sec.qs[sec.cur], answered=sec.qs.filter(x=>x.ans!==null).length, n=sec.qs.length, last=st.si===st.sections.length-1, t=left(sec);
 app.innerHTML=focusBar(`${S.name}${st.sections.length>1?` <span class="muted small">(${st.si+1}/${st.sections.length})</span>`:''}`,
  `<span class="count" id="ansCount">${answered}/${n}</span><button class="icon-btn pal-toggle" id="palBtn" aria-label="خريطة الأسئلة">${ICON.grid}</button><span class="timer ${t<=300?'low':''} ${st.hideTimer&&t>300?'hidden-t':''}" id="timer" role="timer" aria-label="الوقت المتبقي">${mmss(t)}</span>`,answered/n*100)+
 `<div class="wrap"><div class="exam-layout">
   <div class="q-wrap">${qHTML(it.q,it.opts,i=>it.ans===i?'sel':'',sec.cur,n,`<button class="btn btn-sm ${it.flag?'btn-soft':'btn-ghost'}" id="flag" aria-pressed="${it.flag}">${ICON.flag} ${it.flag?'معلَّم للمراجعة':'علّم للمراجعة'}</button>`)}
    <div class="qnav-row">
     <button class="btn btn-ghost" id="prev" ${sec.cur===0?'disabled':''}>السابق</button>
     ${sec.cur<n-1?'<button class="btn btn-pri" id="next">التالي</button>':`<button class="btn btn-pri" id="submit2">تسليم ${last?'الامتحان':'القسم'}</button>`}
    </div>
    <p class="kbd-hint"><kbd>1</kbd>–<kbd>${it.opts.length}</kbd> إجابة • <kbd>←</kbd> التالي • <kbd>→</kbd> السابق • <kbd>F</kbd> علامة • <kbd>G</kbd> الخريطة</p></div>
   <aside class="card palette" id="palette" aria-label="خريطة الأسئلة"><div style="display:flex;justify-content:space-between;align-items:center"><b>خريطة الأسئلة</b><button class="icon-btn pal-toggle" id="palClose" aria-label="إغلاق">${ICON.x}</button></div>
    <div class="legend"><span><i style="background:var(--pri)"></i>مُجاب</span><span><i style="background:var(--card);border:1px solid var(--bd2)"></i>غير مُجاب</span><span><i style="background:var(--flag)"></i>للمراجعة</span></div>
    <div class="pal-grid">${sec.qs.map((x,i)=>`<button data-j="${i}" class="${x.ans!==null?'ans':''} ${x.flag?'flag':''} ${i===sec.cur?'cur':''}" aria-label="سؤال ${i+1}${x.ans!==null?' مُجاب':''}${x.flag?' معلَّم':''}">${i+1}</button>`).join('')}</div>
    <div class="small muted" id="palInfo">غير مُجاب: ${n-answered} • معلَّم: ${sec.qs.filter(x=>x.flag).length}</div>
    <button class="btn btn-pri" id="submit" style="width:100%;margin-top:12px">تسليم ${last?'الامتحان':'القسم'}</button>
   </aside></div></div>`;
 const choose=k=>{it.ans=k;$$('.opt').forEach((x,j)=>x.classList.toggle('sel',j===k));const pb=$(`.pal-grid button[data-j="${sec.cur}"]`);pb&&pb.classList.add('ans');
  const a=sec.qs.filter(x=>x.ans!==null).length;$('#ansCount').textContent=a+'/'+n;$('#palInfo').textContent=`غير مُجاب: ${n-a} • معلَّم: ${sec.qs.filter(x=>x.flag).length}`;$('.focus-bar .bar i').style.width=(a/n*100)+'%';saveLive();};
 const go=j=>{if(j<0||j>=n)return;sec.cur=j;saveLive();viewExam();window.scrollTo({top:0});};
 $$('.opt').forEach(b=>b.onclick=()=>choose(+b.dataset.i));
 $('#prev').onclick=()=>go(sec.cur-1);
 $('#next')&&($('#next').onclick=()=>go(sec.cur+1));
 $('#flag').onclick=()=>{it.flag=!it.flag;saveLive();viewExam();};
 $$('.pal-grid button').forEach(b=>b.onclick=()=>go(+b.dataset.j));
 $('#submit').onclick=()=>confirmSubmit(sec);$('#submit2')&&($('#submit2').onclick=()=>confirmSubmit(sec));
 const pal=$('#palette');$('#palBtn').onclick=()=>pal.classList.toggle('open');$('#palClose').onclick=()=>pal.classList.remove('open');
 $('#fbExit').onclick=()=>{if(confirm('إلغاء الامتحان التجريبي؟ لن تُحفظ النتيجة.')){stopExam(true);setFocus(false);location.hash='#/mock';}};
 keyHandler=e=>{
  const k=keyIndex(e,it.opts.length);if(k>=0){e.preventDefault();choose(k);return;}
  if(e.key==='ArrowLeft'||e.key==='n'||e.key==='N'){e.preventDefault();go(sec.cur+1);}
  else if(e.key==='ArrowRight'||e.key==='p'||e.key==='P'){e.preventDefault();go(sec.cur-1);}
  else if(e.key==='f'||e.key==='F'){$('#flag').click();}
  else if(e.key==='g'||e.key==='G'){pal.classList.toggle('open');}
 };
}
function confirmSubmit(sec){
 const un=sec.qs.filter(x=>x.ans===null).length, fl=sec.qs.filter(x=>x.flag).length;
 const m=document.createElement('div');m.className='modal-bg';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
 m.innerHTML=`<div class="modal"><h3>هل تريد التسليم؟</h3><p>${un?`لديك <b style="color:var(--bad)">${un}</b> سؤال بدون إجابة.`:'أجبت عن جميع الأسئلة.'}${fl?`<br>و<b>${fl}</b> سؤال معلَّم للمراجعة.`:''}</p>
  <p class="muted small">الوقت المتبقي: ${mmss(left(sec))}</p>
  <div class="btns" style="justify-content:center"><button class="btn btn-ghost" id="mNo">رجوع</button><button class="btn btn-pri" id="mYes">نعم، سلّم</button></div></div>`;
 document.body.appendChild(m);$('#mYes',m).focus();
 const close=()=>{m.remove();document.removeEventListener('keydown',esck);};const esck=e=>{if(e.key==='Escape')close();};document.addEventListener('keydown',esck);
 $('#mNo',m).onclick=close;$('#mYes',m).onclick=()=>{close();finishSection();};
}
function finishSection(){
 clearInterval(timerId);timerId=null;keyHandler=null;
 const st=examState, sec=st.sections[st.si];sec.done=true;sec.used=Math.min(sec.dur,sec.dur-left(sec));
 if(st.si<st.sections.length-1){
  st.si++;saveLive();const nx=SUBJ[st.sections[st.si].subj];
  app.innerHTML=`<section class="sec"><div class="wrap fade" style="max-width:560px"><div class="card pad-lg center">
   <h2>انتهى قسم ${SUBJ[sec.subj].name}</h2><p>القسم التالي: <b>${nx.name}</b> — ${nx.n} سؤالاً في ${nx.min} دقيقة.</p>
   <p class="muted">خذ نفساً عميقاً، وعندما تكون جاهزاً اضغط للبدء. لن يبدأ المؤقّت قبل ذلك.</p>
   <button class="btn btn-pri btn-lg" id="nextSec">ابدأ القسم التالي</button></div></div></section>`;
  $('#nextSec').onclick=()=>viewExam();return;
 }
 st.running=false;
 const parts=st.sections.map(sc=>{
  const n=sc.qs.length;let c=0,w=0,u=0;const topics={};
  const items=sc.qs.map(x=>{const ok=x.ans!==null&&x.opts[x.ans].correct;if(x.ans===null)u++;else if(ok)c++;else w++;
   topics[x.q.t]=topics[x.q.t]||{c:0,n:0};topics[x.q.t].n++;if(ok)topics[x.q.t].c++;
   markWrong(sc.subj,x.q.id,!ok);if(x.ans!==null)record(sc.subj,x.q.t,ok);
   return {id:x.q.id,your:x.ans===null?null:x.opts[x.ans].text,ok};});
  const score=c/n*100;
  return {subj:sc.subj,n,c,w,u,score:Math.round(score*10)/10,req:st.req[sc.subj],pass:score>=st.req[sc.subj],topics,items,used:Math.round(sc.used)};
 });
 const rec={id:st.id,date:new Date().toISOString(),mode:st.mode,parts};
 const h=getHist();h.unshift(rec);store.set('history',h.slice(0,50));
 store.del('live');examState=null;setFocus(false);
 location.hash='#/result/'+rec.id;
}
const grade=s=>s>=90?'امتياز':s>=80?'جيد جداً':s>=70?'جيد':s>=60?'متوسط':s>=50?'مقبول':'ضعيف';

/* ---------- النتيجة ---------- */
function viewResult(id){
 const rec=getHist().find(h=>h.id===id);
 if(!rec){app.innerHTML='<div class="wrap empty">لم يتم العثور على النتيجة. <a href="#/progress">نتائجي</a></div>';return;}
 withBank(rec.parts.map(p=>p.subj),()=>{
 const byId={};rec.parts.forEach(p=>BANK[p.subj].forEach(q=>byId[q.id]=q));
 const allPass=rec.parts.every(p=>p.pass);
 app.innerHTML=`<section class="page-head"><div class="wrap fade" style="max-width:980px">
  <h2>نتيجة الامتحان التجريبي</h2><p class="sub">${new Date(rec.date).toLocaleString('ar-IQ',{dateStyle:'full',timeStyle:'short'})}</p>
  ${rec.parts.length>1?`<div class="note ${allPass?'info':''}" style="margin-bottom:18px"><b>${allPass?'مبروك! اجتزت الاختبارات الثلاثة.':'لم تجتز جميع الاختبارات بعد — ركّز على المادة التي لم تجتزها.'}</b></div>`:''}
  ${rec.parts.map((p,pi)=>{const S=SUBJ[p.subj];const weak=Object.entries(p.topics).filter(([t,v])=>v.c/v.n<.6).map(([t])=>t);return `
  <div class="card pad-lg" style="margin-bottom:22px" id="res-${p.subj}">
   <div class="grid g2" style="align-items:center">
    <div><div class="gauge" style="--v:${p.score};--c:${p.pass?'var(--ok)':'var(--bad)'}"><div><b>${fmt1(p.score)}</b><span>من 100</span></div></div>
     <div class="verdict ${p.pass?'ok':'bad'}">${p.pass?'ناجح':'لم تجتز'} — المطلوب ${p.req}</div></div>
    <div><h3>${S.name}</h3><table class="t">
     <tr><td>الإجابات الصحيحة</td><td><b style="color:var(--ok)">${p.c}</b> من ${p.n}</td></tr><tr><td>الخاطئة</td><td><b style="color:var(--bad)">${p.w}</b></td></tr>
     <tr><td>بدون إجابة</td><td><b>${p.u}</b></td></tr><tr><td>التقدير</td><td><b>${grade(p.score)}</b></td></tr><tr><td>الوقت المستغرق</td><td class="ltr" style="text-align:start">${mmss(p.used)}</td></tr></table></div>
   </div>
   <h3 class="mt">الأداء حسب الموضوع</h3>
   ${Object.entries(p.topics).map(([t,v])=>{const pc=v.c/v.n*100;return `<div class="topic-row"><div class="h"><span>${tFull(t)}</span><b>${v.c}/${v.n}</b></div><div class="bar"><i style="width:${pc}%;background:${pc>=70?'var(--ok)':pc>=50?'var(--flag)':'var(--bad)'}"></i></div></div>`;}).join('')}
   ${weak.length?`<div class="note mt">ركّز على: ${weak.map(t=>`<a href="#/practice/${p.subj}?t=${encodeURIComponent(t)}">${esc(tName(t))}</a>`).join('، ')}</div>`:''}
   <h3 class="mt">مراجعة الإجابات</h3>
   <div class="tabs" data-p="${pi}"><button class="on" data-f="bad">الخاطئة وغير المُجابة (${p.w+p.u})</button><button data-f="all">الكل (${p.n})</button></div>
   <div class="rev mt" id="rev${pi}"></div></div>`;}).join('')}
  <div class="btns" style="justify-content:center"><a class="btn btn-pri" href="#/mock">امتحان جديد</a><a class="btn btn-ghost" href="#/practice">تدرّب على الأخطاء</a><a class="btn btn-ghost" href="#/progress">لوحة التقدّم</a></div>
 </div></section>`;
 const drawRev=(pi,f)=>{
  const p=rec.parts[pi];const list=p.items.map((it,i)=>({it,i})).filter(x=>f==='all'||!x.it.ok);
  $('#rev'+pi).innerHTML=list.length?list.map(({it,i})=>{const q=byId[it.id];if(!q)return'';const L=q.ltr?'ltr':'';
   return `<div class="rev-item ${it.ok?'ok':it.your===null?'skip':'bad'}"><div class="small muted">سؤال ${i+1} • ${esc(tName(q.t))}${q.p&&PASSAGES[q.p]?` • Passage: ${esc(PASSAGES[q.p].title)}`:''}</div>
    <div class="${L}" style="font-weight:600;white-space:pre-line">${fmtQ(q)}</div>
    <div>إجابتك: ${it.your===null?'<span class="tag gold">لم تُجب</span>':`<b class="${L}" style="color:${it.ok?'var(--ok)':'var(--bad)'}">${esc(it.your)}</b>`}</div>
    ${it.ok?'':`<div>الصحيح: <b class="${L}" style="color:var(--ok)">${esc(q.o[0])}</b></div>`}
    <div class="small muted">${esc(q.e)}</div>${srcLink(q)}</div>`;}).join(''):'<div class="empty">لا توجد أخطاء — أداء رائع!</div>';
 };
 rec.parts.forEach((p,pi)=>drawRev(pi,'bad'));
 $$('.tabs[data-p]').forEach(t=>$$('button',t).forEach(b=>b.onclick=()=>{$$('button',t).forEach(x=>x.classList.remove('on'));b.classList.add('on');drawRev(+t.dataset.p,b.dataset.f);}));
 });
}

/* ---------- لوحة التقدّم ---------- */
function sparkline(vals){
 if(vals.length<2)return '<div class="muted small">قدّم امتحانين على الأقل لرؤية المنحنى.</div>';
 const W=300,H=90,p=8,mx=100,step=(W-2*p)/(vals.length-1);const pts=vals.map((v,i)=>[p+i*step,H-p-(v/mx)*(H-2*p)]);
 const y50=H-p-.5*(H-2*p);
 return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="منحنى درجات الامتحانات"><line x1="0" x2="${W}" y1="${y50}" y2="${y50}" stroke="var(--bd2)" stroke-dasharray="4 4"/><polyline fill="none" stroke="var(--pri)" stroke-width="2.5" points="${pts.map(x=>x.join(',')).join(' ')}"/>${pts.map(x=>`<circle cx="${x[0]}" cy="${x[1]}" r="3.5" fill="var(--pri)"/>`).join('')}</svg>`;
}
function viewProgress(){
 const h=getHist(), W=getWrong(), days=store.get('days',{});
 const tot=ORDER.reduce((a,s)=>{const x=subjStats(s);a.a+=x.a;a.c+=x.c;return a;},{a:0,c:0});
 const weak=[];ORDER.forEach(s=>{const T=subjStats(s).topics;for(const t in T){if(T[t].a>=5)weak.push({s,t,a:T[t].a,p:T[t].c/T[t].a});}});weak.sort((x,y)=>x.p-y.p);
 const heat=[];const d0=new Date();d0.setDate(d0.getDate()-27);for(let i=0;i<28;i++){const k=dayKey(d0);const v=days[k]||0;heat.push(`<i class="${v>=40?'l3':v>=15?'l2':v>0?'l1':''}" title="${k}: ${v}"></i>`);d0.setDate(d0.getDate()+1);}
 app.innerHTML=`<section class="page-head"><div class="wrap fade"><h2>لوحة التقدّم</h2><p class="sub">تُحفظ بياناتك على هذا الجهاز فقط (في المتصفح).</p>
  <div class="grid g4">
   <div class="kpi"><b>${tot.a}</b><span>سؤالاً أجبت عنه</span></div>
   <div class="kpi"><b>${tot.a?pct(tot.c,tot.a)+'%':'—'}</b><span>نسبة الصواب الكلية</span></div>
   <div class="kpi"><b>${streak()}</b><span>أيام متتالية من المذاكرة</span></div>
   <div class="kpi"><b>${h.length}</b><span>امتحاناً تجريبياً</span></div>
  </div>
  <div class="grid g2 mt">
   <div class="card"><h3>الدقة حسب المادة</h3>${ORDER.map(s=>{const x=subjStats(s),b=bestOf(s);return `<div class="topic-row"><div class="h"><span>${SUBJ[s].name}</span><b>${x.a?pct(x.c,x.a)+'%':'—'} <span class="muted small">(${x.a} سؤال${b!==null?` • أفضل امتحان ${fmt1(b)}`:''})</span></b></div><div class="bar"><i style="width:${pct(x.c,x.a)}%"></i></div></div>`;}).join('')}
    <h4 class="mt">نشاط آخر 4 أسابيع</h4><div class="heat" aria-label="خريطة النشاط">${heat.join('')}</div>
    <div class="field mt" style="margin-bottom:0"><label for="goalSel">هدفك اليومي (عدد الأسئلة)</label><select id="goalSel">${[20,30,40,60,80,100].map(g=>`<option ${g===goal()?'selected':''}>${g}</option>`).join('')}</select></div></div>
   <div class="card"><h3>المواضيع الأضعف</h3>${weak.length?weak.slice(0,7).map(w=>`<div class="weak"><div><b>${esc(tName(w.t))}</b> <span class="muted small">— ${SUBJ[w.s].short} • ${w.a} سؤال</span><div class="bar" style="width:160px;margin-top:4px"><i style="width:${w.p*100}%;background:${w.p>=.7?'var(--ok)':w.p>=.5?'var(--flag)':'var(--bad)'}"></i></div></div><div style="text-align:end"><b>${Math.round(w.p*100)}%</b><br><a class="btn btn-sm btn-soft" href="#/practice/${w.s}?t=${encodeURIComponent(w.t)}">تدرّب</a></div></div>`).join(''):'<div class="empty">أجب عن 5 أسئلة على الأقل في موضوع لتظهر هنا.</div>'}
    <div class="btns mt">${ORDER.filter(s=>(W[s]||[]).length).map(s=>`<a class="btn btn-sm btn-ghost" href="#/practice/${s}?t=__wrong">أخطاء ${SUBJ[s].short} (${W[s].length})</a>`).join('')}</div></div>
  </div>
  <div class="card mt"><h3>درجات الامتحانات التجريبية</h3>${sparkline(h.slice().reverse().flatMap(r=>r.parts.map(p=>p.score)).slice(-20))}
   ${h.length?`<div style="overflow:auto" class="mt"><table class="t"><tr><th>التاريخ</th><th>الامتحان</th><th>الدرجات</th><th>النتيجة</th><th></th></tr>
   ${h.map(r=>`<tr><td>${new Date(r.date).toLocaleDateString('ar-IQ')}</td><td>${r.parts.length>1?'الثلاثة':SUBJ[r.parts[0].subj].name}</td><td>${r.parts.map(p=>`${SUBJ[p.subj].short}: <b>${fmt1(p.score)}</b>`).join(' • ')}</td>
    <td>${r.parts.every(p=>p.pass)?'<span class="tag ok">ناجح</span>':'<span class="tag bad">لم يجتز</span>'}</td><td><a class="btn btn-sm btn-ghost" href="#/result/${r.id}">التفاصيل</a></td></tr>`).join('')}</table></div>`:'<div class="empty">لم تقدّم أي امتحان تجريبي بعد. <a href="#/mock">ابدأ الآن</a></div>'}</div>
  <div class="card mt"><h3>بياناتك</h3><p class="muted small">انقل تقدّمك إلى جهاز آخر عبر ملف، أو امسحه.</p>
   <div class="btns"><button class="btn btn-sm btn-ghost" id="exp">تصدير التقدّم</button><label class="btn btn-sm btn-ghost">استيراد<input type="file" id="imp" accept="application/json" hidden></label><button class="btn btn-sm btn-ghost" id="clr" style="color:var(--bad)">مسح كل البيانات</button></div></div>
 </div></section>`;
 $('#goalSel').onchange=e=>{store.set('goal',+e.target.value);toast('تم حفظ الهدف');};
 $('#clr').onclick=()=>{if(confirm('مسح كل النتائج والتقدم والخطة؟')){Object.keys(localStorage).filter(k=>k.startsWith('ine_')&&k!=='ine_theme').forEach(k=>localStorage.removeItem(k));viewProgress();}};
 $('#exp').onclick=()=>{const o={};Object.keys(localStorage).filter(k=>k.startsWith('ine_')).forEach(k=>o[k]=localStorage.getItem(k));const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:'application/json'}));a.download='national-exam-progress-'+dayKey()+'.json';a.click();};
 $('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{const o=JSON.parse(t);Object.keys(o).filter(k=>k.startsWith('ine_')).forEach(k=>localStorage.setItem(k,o[k]));toast('تم الاستيراد');viewProgress();}catch(x){toast('ملف غير صالح');}});};
}

/* ---------- مؤقّت التركيز (بومودورو) ---------- */
const pomo={
 el:null,mini:null,
 st(){return store.get('pomo',{mode:'focus',endAt:null,remain:25*60,sessions:0,focusMin:25,breakMin:5});},
 save(s){store.set('pomo',s);},
 dur(s,m){return (m==='focus'?s.focusMin:s.breakMin)*60;},
 left(s){return s.endAt?Math.max(0,Math.round((s.endAt-Date.now())/1000)):s.remain;},
 init(){
  this.el=document.createElement('div');this.el.className='pomo';this.el.setAttribute('role','dialog');this.el.setAttribute('aria-label','مؤقّت التركيز');
  this.mini=document.createElement('button');this.mini.className='pomo-mini';this.mini.setAttribute('aria-label','مؤقّت التركيز');
  document.body.append(this.el,this.mini);this.mini.onclick=()=>this.toggle(true);
  document.addEventListener('click',e=>{if(e.target.closest('[data-pomo]'))this.toggle();});
  $('#pomoBtn').onclick=()=>this.toggle();
  setInterval(()=>this.tick(),1000);this.render();
 },
 toggle(force){const o=force!=null?force:!this.el.classList.contains('open');this.el.classList.toggle('open',o);this.render();},
 tick(){const s=this.st();if(s.endAt&&this.left(s)<=0){const wasFocus=s.mode==='focus';if(wasFocus)s.sessions++;s.mode=wasFocus?'break':'focus';s.endAt=null;s.remain=this.dur(s,s.mode);this.save(s);this.beep();toast(wasFocus?'أحسنت! خذ استراحة قصيرة ☕':'انتهت الاستراحة — لنبدأ جلسة تركيز',4000);}this.render(true);},
 beep(){try{const A=new (window.AudioContext||window.webkitAudioContext)();[0,.25,.5].forEach(t=>{const o=A.createOscillator(),g=A.createGain();o.frequency.value=660;o.connect(g);g.connect(A.destination);g.gain.setValueAtTime(.15,A.currentTime+t);g.gain.exponentialRampToValueAtTime(.001,A.currentTime+t+.2);o.start(A.currentTime+t);o.stop(A.currentTime+t+.22);});}catch(e){}},
 render(light){
  const s=this.st(),t=this.left(s),run=!!s.endAt;
  $('#pomoBtn').classList.toggle('on',run);
  this.mini.classList.toggle('show',run&&!this.el.classList.contains('open'));
  this.mini.innerHTML=`${s.mode==='focus'?'تركيز':'استراحة'} ${mmss(t)}`;
  if(light&&this.el.classList.contains('open')){const x=$('.tm',this.el);if(x){x.textContent=mmss(t);return;}}
  if(!this.el.classList.contains('open'))return;
  this.el.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><b>مؤقّت التركيز</b><button class="icon-btn" data-x aria-label="إغلاق" style="width:32px;height:32px">${ICON.x}</button></div>
   <div class="mode mt"><button class="chip ${s.mode==='focus'?'on':''}" data-m="focus">تركيز ${s.focusMin}د</button><button class="chip ${s.mode==='break'?'on':''}" data-m="break">استراحة ${s.breakMin}د</button></div>
   <div class="tm" role="timer">${mmss(t)}</div>
   <div class="btns" style="justify-content:center"><button class="btn btn-pri btn-sm" data-go>${run?'إيقاف مؤقت':'ابدأ'}</button><button class="btn btn-ghost btn-sm" data-r>إعادة</button></div>
   <div class="small muted center mt">جلسات اليوم المكتملة: ${s.sessions}</div>
   <div class="small center"><label>مدة التركيز <select data-f style="width:auto;padding:2px 6px">${[15,20,25,30,45,50].map(m=>`<option ${m===s.focusMin?'selected':''}>${m}</option>`).join('')}</select> دقيقة</label></div>`;
  $('[data-x]',this.el).onclick=()=>this.toggle(false);
  $$('[data-m]',this.el).forEach(b=>b.onclick=()=>{const s2=this.st();s2.mode=b.dataset.m;s2.endAt=null;s2.remain=this.dur(s2,s2.mode);this.save(s2);this.render();});
  $('[data-go]',this.el).onclick=()=>{const s2=this.st();if(s2.endAt){s2.remain=this.left(s2);s2.endAt=null;}else{s2.endAt=Date.now()+s2.remain*1000;}this.save(s2);this.render();};
  $('[data-r]',this.el).onclick=()=>{const s2=this.st();s2.endAt=null;s2.remain=this.dur(s2,s2.mode);this.save(s2);this.render();};
  $('[data-f]',this.el).onchange=e=>{const s2=this.st();s2.focusMin=+e.target.value;if(s2.mode==='focus'&&!s2.endAt)s2.remain=s2.focusMin*60;this.save(s2);this.render();};
 }
};
/* إعادة ضبط عدّاد الجلسات يومياً */
(()=>{const s=pomo.st();if(store.get('pomoDay','')!==dayKey()){s.sessions=0;store.set('pomoDay',dayKey());pomo.save(s);}})();
pomo.init();

/* ---------- عامل الخدمة للعمل دون اتصال ---------- */
if('serviceWorker' in navigator&&location.protocol==='https:'){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}

route();
})();
