/* eslint-disable no-undef, no-underscore-dangle, no-restricted-globals */

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
//workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
//workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

// //Web Push Notifications//
// let click_open_url
// self.addEventListener('push', function(event) {
//   let push_message = event.data.json()
//   // push notification can send event.data.json() as well
//   click_open_url = push_message.notification.data.url
//   const options = {
//     body: push_message.notification.body,
//     icon: push_message.notification.icon,
//     image: push_message.notification.image,
//     tag: 'alert'
//   };
//   event.waitUntil(self.registration.showNotification(push_message.notification.title, options));
// });
// self.addEventListener('notificationclick', function(event) {
//   const clickedNotification = event.notification;
//   clickedNotification.close();
//   if ( click_open_url ){
//     const promiseChain = clients.openWindow(click_open_url);
//     event.waitUntil(promiseChain);
//   }
// });
