"use strict";var precacheConfig=[["/rewrite-gallery/index.html","f42b33e20173e6b250ae5fd8e6493ba2"],["/rewrite-gallery/static/css/main.31602b95.css","8e9a0ceb215fc198f0d739541e7d6bd9"],["/rewrite-gallery/static/js/main.fcfd2371.js","8d52e4c3e706866dce191fd04698920f"],["/rewrite-gallery/static/media/ 1.a7ed84f3.jpg","a7ed84f311021d50651c0059f2f041ff"],["/rewrite-gallery/static/media/ 10.245659da.jpg","245659dac7a449d79ed8d68ff4c6104a"],["/rewrite-gallery/static/media/ 11.d263a580.jpg","d263a58023750daf041d27319262516d"],["/rewrite-gallery/static/media/ 12.1a3be373.jpg","1a3be3737420274609e7243f9e7cec39"],["/rewrite-gallery/static/media/ 13.94af379a.jpg","94af379a06cab3795797ada51ef96cc5"],["/rewrite-gallery/static/media/ 14.155c22e8.jpg","155c22e83afba63e05888313a804d77e"],["/rewrite-gallery/static/media/ 15.dba74384.jpg","dba74384d9d2905045c5496e2362391f"],["/rewrite-gallery/static/media/ 16.c27388b4.jpg","c27388b48e57b5cad272ac6f95262af6"],["/rewrite-gallery/static/media/ 2.eac666e9.jpg","eac666e96c4eb2bfd19ed22afffa15e5"],["/rewrite-gallery/static/media/ 3.2f678aa1.jpg","2f678aa1bc3fb45f69382f1855dbef2c"],["/rewrite-gallery/static/media/ 4.e98c8a5e.jpg","e98c8a5e764e1108cdbdb29ee060f182"],["/rewrite-gallery/static/media/ 5.ebb16a47.jpg","ebb16a47b22233ef2c52c69e62a308e5"],["/rewrite-gallery/static/media/ 6.9fda8271.jpg","9fda8271728b188a98f7fd2b200799c7"],["/rewrite-gallery/static/media/ 7.fc86eee2.jpg","fc86eee2aac68244a95d80fadf31361b"],["/rewrite-gallery/static/media/ 8.e3bfeb79.jpg","e3bfeb79984938c1d9bef8a6c8c54954"],["/rewrite-gallery/static/media/ 9.32c578af.jpg","32c578af5281578baf2ecab2a26f2311"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var r=new Request(a,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),r="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,r),t=urlsToCacheKeys.has(a));var n="/rewrite-gallery/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(n,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});