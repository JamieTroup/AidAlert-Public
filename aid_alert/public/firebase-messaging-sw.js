// public/firebase-messaging-sw.js
/* eslint-disable no-undef */
/* global importScripts, firebase */
importScripts(
	'https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js'
);

firebase.initializeApp({
//redacted
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		'[firebase-messaging-sw.js] Received background message',
		payload
	);
});

// Handle notification click
//Not working
self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	event.waitUntil(clients.openWindow('/dashboard'));
});
