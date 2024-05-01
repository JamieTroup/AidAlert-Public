import React, { useEffect } from 'react';
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
import Dashboard from './dashboard';
import SettingsMenu from './settingsMenu';
import AboutPage from './aboutPage';
import awsExports from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuration for AWS Amplify using the exported settings from aws-exports
Amplify.configure(awsExports);

/**
 * Component to redirect users to the Dashboard page on load.
 * Utilizes the `useNavigate` hook from React Router for redirection.
 */
function RedirectToDashboard() {
	const navigate = useNavigate();

	// useEffect hook to perform the redirection after the component mounts
	useEffect(() => {
		navigate('/dashboard');
	}, [navigate]); // Dependency array includes navigate to prevent unnecessary re-runs

	return null; // Component does not render anything
}

/**
 * App component that serves as the root of the application.
 * It wraps the application in an Authenticator component from AWS Amplify UI React,
 * providing authentication functionality. Inside, a Router manages the navigation
 * between different components based on the URL path.
 */
function App() {
	return (
		<Authenticator hideSignUp={true}>
			{({ signOut, user }) =>
				user && (
					<main>
						<Router>
							<Routes>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route
									path="/settings"
									element={<SettingsMenu signOut={signOut} />}
								/>
								<Route path="/about" element={<AboutPage />} />
								<Route path="/" element={<RedirectToDashboard />} />
							</Routes>
						</Router>
					</main>
				)
			}
		</Authenticator>
	);
}

export default App;
