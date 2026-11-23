/* عامل خدمة بسيط: الشبكة أولاً ثم النسخة المخزنة (لضمان أحدث محتوى مع العمل دون اتصال) */
const CACHE='ine-v5';
const CORE=['./','index.html','css/styles.css?v=5','js/bank/meta.js?v=5','js/guide.js?v=5','js/notes.js?v=5','js/app.js?v=5','js/bank/arabic.js?v=5','js/bank/english.js?v=5','js/bank/computer.js?v=5','assets/fonts/plex-arabic-400.woff2','assets/fonts/plex-arabic-600.woff2','assets/fonts/plex-arabic-700.woff2','assets/fonts/plex-arabic-latin-400.woff2','assets/fonts/inter-400.woff2','assets/fonts/inter-600.woff2','assets/fonts/inter-700.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(r.url.endsWith('.pdf'))return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r,{ignoreSearch:false}).then(m=>m||caches.match(r,{ignoreSearch:true}))));
});
