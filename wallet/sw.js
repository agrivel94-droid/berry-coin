const CACHE='berry-wallet-v1-1-2026-11';const FILES=['./','./index.html','./style.css','./app.js','./transfer.js','./assets/berry-coin.png','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;e.respondWith(fetch(req).then(resp=>{if(resp.ok){const cloned=resp.clone();caches.open(CACHE).then(c=>c.put(req,cloned))}return resp}).catch(()=>caches.match(req)))})
