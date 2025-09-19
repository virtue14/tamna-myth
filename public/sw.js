const STATIC_CACHE = 'tamna-myth-static-v1';
const IMAGE_CACHE = 'tamna-myth-images-v1';

// 캐시할 정적 리소스
const STATIC_ASSETS = [
  '/',
  '/myths',
  '/myth-character',
  '/games',
  '/promotion',
  '/manifest.json'
];

// 캐시할 이미지들
const IMAGE_ASSETS = [
  '/images/설문대할망.png',
  '/images/삼승할망.png',
  '/images/자청비.png',
  '/images/본향당 신화(마을 수호신).png',
  '/images/영등할망.png',
  '/images/해신(용왕 전설).png',
  '/images/문도령.png',
  '/images/세경본풀이.png',
  '/images/돌하르방(장승).png',
  '/images/칠성신.png',
  '/images/엠포스.png'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // 정적 리소스 캐시
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      // 이미지 캐시
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.addAll(IMAGE_ASSETS);
      })
    ])
  );
  
  // 즉시 활성화
  self.skipWaiting();
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // 즉시 제어권 획득
  self.clients.claim();
});

// 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // 이미지 요청 처리
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((response) => {
          // 응답이 유효한 경우에만 캐시에 저장
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // 네트워크 실패 시 기본 이미지 반환
          return new Response('', { status: 404 });
        });
      })
    );
    return;
  }
  
  // HTML 페이지 요청 처리
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request).then((response) => {
        // 성공적인 응답을 캐시에 저장
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // 네트워크 실패 시 캐시에서 반환
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 캐시에도 없으면 오프라인 페이지 반환
          return caches.match('/').then((fallbackResponse) => {
            return fallbackResponse || new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }
  
  // 기타 리소스는 네트워크 우선, 캐시 폴백
  event.respondWith(
    fetch(request).then((response) => {
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(STATIC_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(request);
    })
  );
});

// 백그라운드 동기화 (선택사항)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 백그라운드에서 수행할 작업
      console.log('Background sync triggered')
    );
  }
});

// 푸시 알림 처리 (선택사항)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/엠포스.png',
      badge: '/images/엠포스.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});
