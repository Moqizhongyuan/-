// 安装阶段
self.addEventListener("install", function (event) {
  console.log("Service Worker 安装中...");
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["https://code.jquery.com/jquery-3.6.0.min.js"]);
    })
  );
});

// 激活阶段
self.addEventListener("activate", function (event) {
  console.log("Service Worker 激活中...");
  // 清除过时的缓存等
});

// 拦截网络请求并返回缓存或网络数据
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果缓存中有匹配的资源，返回缓存资源
      if (response) {
        return response;
      }
      // 否则从网络请求
      return fetch(event.request);
    })
  );
});
