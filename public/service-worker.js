// Service Worker for A Huevo Es Verde PWA
// Version 1.0.2

const CACHE_VERSION = 'ahuevo-v3';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/menu.json',
    '/manifest.json',
    '/offline.html',
    '/images/6f694ae6-8898-4889-a769-82766dbf3725.png'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('[Service Worker] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_VERSION) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        // Cache external resources (fonts, CDN assets)
        if (request.destination === 'font' ||
            request.destination === 'style' ||
            request.destination === 'script') {
            event.respondWith(
                caches.match(request).then((response) => {
                    return response || fetch(request).then((fetchResponse) => {
                        return caches.open(CACHE_VERSION).then((cache) => {
                            cache.put(request, fetchResponse.clone());
                            return fetchResponse;
                        });
                    });
                })
            );
        }
        return;
    }

    // For navigation requests, use network-first strategy
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Update cache with fresh content
                    const responseClone = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // If offline, try cache first
                    return caches.match(request).then((response) => {
                        return response || caches.match(OFFLINE_URL);
                    });
                })
        );
        return;
    }

    // For API requests (Firebase), use network-first
    if (url.pathname.includes('firebaseio.com') || url.pathname.includes('googleapis.com')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    return response;
                })
                .catch(() => {
                    return new Response(
                        JSON.stringify({ error: 'offline', message: 'Sin conexión' }),
                        {
                            status: 503,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                })
        );
        return;
    }

    // For images and static assets, use cache-first strategy
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request).then((fetchResponse) => {
                    return caches.open(CACHE_VERSION).then((cache) => {
                        cache.put(request, fetchResponse.clone());
                        return fetchResponse;
                    });
                }).catch(() => {
                    // Return placeholder image if offline
                    return new Response('<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="#E0E0E0"/><text x="50%" y="50%" text-anchor="middle" fill="#666" font-size="20">Sin conexión</text></svg>', {
                        headers: { 'Content-Type': 'image/svg+xml' }
                    });
                });
            })
        );
        return;
    }

    // Default: cache-first strategy
    event.respondWith(
        caches.match(request).then((response) => {
            return response || fetch(request).then((fetchResponse) => {
                return caches.open(CACHE_VERSION).then((cache) => {
                    cache.put(request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});

// Push notification event
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received:', event);

    let data = {
        title: 'A Huevo Es Verde',
        body: '¡Tienes una actualización!',
        icon: '/images/6f694ae6-8898-4889-a769-82766dbf3725.png',
        badge: '/images/6f694ae6-8898-4889-a769-82766dbf3725.png',
        tag: 'default'
    };

    if (event.data) {
        try {
            const pushData = event.data.json();
            data = { ...data, ...pushData };
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        tag: data.tag,
        requireInteraction: false,
        actions: [
            {
                action: 'view',
                title: 'Ver',
                icon: '/images/6f694ae6-8898-4889-a769-82766dbf3725.png'
            },
            {
                action: 'close',
                title: 'Cerrar'
            }
        ],
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/',
            dateOfArrival: Date.now()
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked:', event);

    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if app is already open
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Open new window if not open
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Background sync for offline orders
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOfflineOrders());
    }
});

// Sync offline orders when connection is restored
async function syncOfflineOrders() {
    try {
        const cache = await caches.open(CACHE_VERSION);
        const offlineOrders = await cache.match('/offline-orders');

        if (offlineOrders) {
            const orders = await offlineOrders.json();

            // Send each order to Firebase
            for (const order of orders) {
                try {
                    // This would be handled by the main app
                    console.log('[Service Worker] Syncing offline order:', order);
                } catch (error) {
                    console.error('[Service Worker] Failed to sync order:', error);
                }
            }

            // Clear offline orders
            await cache.delete('/offline-orders');
        }
    } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
    }
}

// Message event for communication with the app
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_VERSION)
                .then((cache) => cache.addAll(event.data.urls))
        );
    }
});
