//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/firebase-messaging-sw.js')
		.then(function (registration) {
			console.log('Registration successful, scope is:', registration.scope);
		})
		.catch(function (err) {
			console.log('Service worker registration failed, error:', err);
		});
}
