import { useEffect } from 'react';
import {
	getMessaging,
	getToken,
	onMessage,
	isSupported,
} from 'firebase/messaging';
import firebaseApp from './firebase-config';

/**
 * Notifications component to handle Firebase Cloud Messaging (FCM) initialization,
 * including requesting permission, retrieving the token, and listening for messages.
 */
const Notifications = () => {
	// Convert the VAPID key from URL safe base64 string to a Uint8Array
	const vapidKey = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_KEY);

	useEffect(() => {
		/**
		 * Initializes Firebase messaging, requests notification permission, retrieves
		 * the token for the client, and sets up an onMessage listener for incoming messages.
		 */
		const initializeFirebaseMessaging = async () => {
			// Check if messaging is supported on the browser
			if (await isSupported()) {
				const messaging = getMessaging(firebaseApp);

				// Request notification permissions from the user
				Notification.requestPermission().then((permission) => {
					if (permission === 'granted') {
						console.log('Notification permission granted.');

						// Retrieve the current token, or request permission to generate one
						getToken(messaging, { vapidKey: vapidKey })
							.then((currentToken) => {
								if (currentToken) {
									console.log('FCM Token:', currentToken);
								} else {
									window.alert(
										'No registration token available. Request permission to generate one.'
									);
								}
							})
							.catch((err) => {
								console.error('Failed to retrieve token.', err);
								window.alert(
									'An error occurred while retrieving token. ' + err
								);
							});
					} else {
						console.error('Notification permission denied.');
						window.alert('Unable to get permission to notify.');
					}
				});

				// Setup listener for incoming messages
				onMessage(messaging, (payload) => {
					console.log('Message received. ', payload);
					// Optionally handle message payload here
				});
			} else {
				console.error('Firebase messaging is not supported on this browser.');
				window.alert('Messaging is not supported on this browser');
			}
		};

		initializeFirebaseMessaging();
	}, [vapidKey]);

	return null; // This component does not render anything to the DOM
};

export default Notifications;

/**
 * Converts a URL-safe base64-encoded string to a Uint8Array.
 * This is often necessary for passing web credentials (VAPID keys) in web push notifications.
 *
 * @param {string} base64String - The base64 string to convert.
 * @returns {Uint8Array} - The converted array of bytes.
 */
function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
