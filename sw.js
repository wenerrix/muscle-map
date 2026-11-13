// Offline support for the installed app. VERSION changes whenever any cached file changes.
const VERSION='mm-25f900a0bd';
const PRECACHE=["./", "./index.html", "./manifest.webmanifest", "./icons/apple-touch-icon.png", "./icons/favicon-64.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./img/abWheel-0.jpg", "./img/abWheel-1.jpg", "./img/abduction-0.jpg", "./img/abduction-1.jpg", "./img/adduction-0.jpg", "./img/adduction-1.jpg", "./img/backExt-0.jpg", "./img/backExt-1.jpg", "./img/bandCalf-0.jpg", "./img/bandCalf-1.jpg", "./img/bandCurl-0.jpg", "./img/bandCurl-1.jpg", "./img/bandFly-0.jpg", "./img/bandFly-1.jpg", "./img/bandGoodMorning-0.jpg", "./img/bandGoodMorning-1.jpg", "./img/bandKickback-0.jpg", "./img/bandKickback-1.jpg", "./img/bandLatRaise-0.jpg", "./img/bandLatRaise-1.jpg", "./img/bandOhp-0.jpg", "./img/bandOhp-1.jpg", "./img/bandPress-0.jpg", "./img/bandPress-1.jpg", "./img/bandPullApart-0.jpg", "./img/bandPullApart-1.jpg", "./img/bandPulldown-0.jpg", "./img/bandPulldown-1.jpg", "./img/bandRow-0.jpg", "./img/bandRow-1.jpg", "./img/bandSquat-0.jpg", "./img/bandSquat-1.jpg", "./img/bandTriExt-0.jpg", "./img/bandTriExt-1.jpg", "./img/bench-0.jpg", "./img/bench-1.jpg", "./img/benchDips-0.jpg", "./img/benchDips-1.jpg", "./img/bss-0.jpg", "./img/bss-1.jpg", "./img/bwCalf-0.jpg", "./img/bwCalf-1.jpg", "./img/bwLunge-0.jpg", "./img/bwLunge-1.jpg", "./img/bwSplitSquat-0.jpg", "./img/bwSplitSquat-1.jpg", "./img/bwSquat-0.jpg", "./img/bwSquat-1.jpg", "./img/bwStepUp-0.jpg", "./img/bwStepUp-1.jpg", "./img/calfRaise-0.jpg", "./img/calfRaise-1.jpg", "./img/chinup-0.jpg", "./img/chinup-1.jpg", "./img/curl-0.jpg", "./img/curl-1.jpg", "./img/deadBug-0.jpg", "./img/deadBug-1.jpg", "./img/deadlift-0.jpg", "./img/deadlift-1.jpg", "./img/dips-0.jpg", "./img/dips-1.jpg", "./img/facePull-0.jpg", "./img/facePull-1.jpg", "./img/farmer-0.jpg", "./img/farmer-1.jpg", "./img/fly-0.jpg", "./img/fly-1.jpg", "./img/frontSquat-0.jpg", "./img/frontSquat-1.jpg", "./img/gluteBridge-0.jpg", "./img/gluteBridge-1.jpg", "./img/hammer-0.jpg", "./img/hammer-1.jpg", "./img/hangingLeg-0.jpg", "./img/hangingLeg-1.jpg", "./img/hipThrust-0.jpg", "./img/hipThrust-1.jpg", "./img/incline-0.jpg", "./img/incline-1.jpg", "./img/invertedRow-0.jpg", "./img/invertedRow-1.jpg", "./img/latRaise-0.jpg", "./img/latRaise-1.jpg", "./img/legCurl-0.jpg", "./img/legCurl-1.jpg", "./img/legExt-0.jpg", "./img/legExt-1.jpg", "./img/legPress-0.jpg", "./img/legPress-1.jpg", "./img/lunge-0.jpg", "./img/lunge-1.jpg", "./img/monsterWalk-0.jpg", "./img/monsterWalk-1.jpg", "./img/ohExt-0.jpg", "./img/ohExt-1.jpg", "./img/ohp-0.jpg", "./img/ohp-1.jpg", "./img/pallof-0.jpg", "./img/pallof-1.jpg", "./img/plank-0.jpg", "./img/plank-1.jpg", "./img/pulldown-0.jpg", "./img/pulldown-1.jpg", "./img/pullup-0.jpg", "./img/pullup-1.jpg", "./img/pushdown-0.jpg", "./img/pushdown-1.jpg", "./img/pushup-0.jpg", "./img/pushup-1.jpg", "./img/rdl-0.jpg", "./img/rdl-1.jpg", "./img/revFly-0.jpg", "./img/revFly-1.jpg", "./img/reverseCrunch-0.jpg", "./img/reverseCrunch-1.jpg", "./img/row-0.jpg", "./img/row-1.jpg", "./img/seatedRow-0.jpg", "./img/seatedRow-1.jpg", "./img/shrug-0.jpg", "./img/shrug-1.jpg", "./img/sidePlank-0.jpg", "./img/sidePlank-1.jpg", "./img/squat-0.jpg", "./img/squat-1.jpg", "./img/stepUp-0.jpg", "./img/stepUp-1.jpg", "./img/suitcase-0.jpg", "./img/suitcase-1.jpg", "./img/superman-0.jpg", "./img/superman-1.jpg", "./img/tibRaise-0.jpg", "./img/tibRaise-1.jpg"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mm-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  // pages: network first so updates arrive, cached copy when offline
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(res=>{const cp=res.clone(); caches.open(VERSION).then(c=>c.put('./index.html',cp)); return res;})
      .catch(()=>caches.match('./index.html')));
    return;
  }
  // our own files (images, icons): cache first
  if(url.origin===location.origin){
    e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
      if(res.ok){const cp=res.clone(); caches.open(VERSION).then(c=>c.put(req,cp));} return res;})));
    return;
  }
  // Google Fonts: serve cached copy, refresh in the background
  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open('fonts-v1').then(c=>c.match(req).then(hit=>{
      const net=fetch(req).then(res=>{c.put(req,res.clone()); return res;}).catch(()=>hit);
      return hit||net;})));
  }
  // everything else (YouTube etc.) goes straight to the network
});
