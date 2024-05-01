import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import Dashboard from './dashboard.js';
import SettingsMenu from './settingsMenu.js';
import awsExports from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomNavBar from './ui-components/bottomNavBar.js';
import { useOnlineStatus } from './useOnlineStatus';
// import ShowAlertModal from './alertModal.js';
import { getToken, onMessage, getMessaging } from 'firebase/messaging';
import firebaseApp from './firebase-config.js';
import { uploadFCMToken } from './uploadFCMToken.js';
import { startHeartbeat } from './sendHeartbeat.js';

// Configure AWS Amplify with the export settings
Amplify.configure(awsExports);

/**
 * Component to redirect users to the dashboard page.
 */
function RedirectToDashboard() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/dashboard');
	}, [navigate]);

	return null;
}

/**
 * Main application component that sets up the router, authentication, and navigation logic.
 */
function App() {
	const { toggleOnlineStatus, isButtonDisabled } = useOnlineStatus();
	const [destination, setDestination] = useState('');
	const [isNavigating, setIsNavigating] = useState(false);

	/**
	 * Updates the navigation destination and starts navigation.
	 * @param {Object} newDestination - The new destination coordinates.
	 */
	const updateDestination = (newDestination) => {
		setDestination(newDestination);
		setIsNavigating(true);
	};

	/**
	 * Stops navigation by setting isNavigating state to false.
	 */
	const stopNavigation = () => {
		console.log('Stopping navigation...');
		setIsNavigating(false);
	};

	const messaging = getMessaging(firebaseApp);

	// Initialize heartbeat and handle Firebase Messaging.
	useEffect(() => {
		startHeartbeat();
	}, []);

	useEffect(() => {
		getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY })
			.then((currentToken) => {
				if (currentToken) {
					uploadFCMToken(currentToken);
				} else {
					console.log(
						'No registration token available. Request permission to generate one.'
					);
				}
			})
			.catch((err) => {
				console.log('An error occurred while retrieving token. ', err);
			});

		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			// Additional logic to handle received messages can be implemented here
		});
	}, [messaging]);

	return (
		<Authenticator>
			{({ signOut, user }) =>
				user && (
					<main>
						<Router>
							<div>
								<Routes>
									<Route
										path="/dashboard"
										element={
											<Dashboard
												destination={destination}
												updateDestination={updateDestination}
												stopNavigation={stopNavigation}
												isNavigating={isNavigating}
											/>
										}
									/>
									<Route
										path="/settings"
										element={<SettingsMenu signOut={signOut} />}
									/>
									<Route path="/" element={<RedirectToDashboard />} />
								</Routes>
								<BottomNavBar
									toggleOnlineStatus={toggleOnlineStatus}
									isButtonDisabled={isButtonDisabled}
								/>
								{/* <ShowAlertModal updateDestination={updateDestination} /> */}
							</div>
						</Router>
					</main>
				)
			}
		</Authenticator>
	);
}

export default App;
