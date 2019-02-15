console.log('Started', self);

/*
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});
*/


var CACHE_NAME = 'my-test-site-cache';
var urlsToCache = [
  '/a2hs/',
  '/a2hs/js/main.js',
  '/a2hs/images/mobile180x180.png'
];

/*
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache-name').then(function(cache) {
      return cache.addAll([
		  '/a2hs/',
		  '/a2hs/js/main.js',
		  '/a2hs/images/mobile180x180.png'
           ]);
    }).then(function(){
      console.log('설치완료');
    }).catch(function(){
      console.log('설치실패');
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
		console.log('test1');
        if (response) {
     		console.log('test2');
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
				console.log('test3');
        var fetchRequest = event.request.clone();
		console.log('test4');
        return fetch(fetchRequest).then(
          function(response) {
								console.log('test5');
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
									console.log('test6');
              return response;
            }
					console.log('test7');
            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();
					console.log('test8');
            caches.open(CACHE_NAME)
              .then(function(cache) {
									console.log('test9');
                cache.put(event.request, responseToCache);
              });
					console.log('test10');
            return response;
          }
        );
      })
    );
});


self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['my-test-site-cache', 'posts-cache'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

