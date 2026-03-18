self.addEventListener('install', (e) => {
    console.log('[Service Worker] 安装成功');
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => new Response('你已断网')));
});
