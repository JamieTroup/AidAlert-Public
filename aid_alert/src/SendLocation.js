import { getCurrentUser } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure AWS Amplify with the settings from the aws-exports file
Amplify.configure(awsExports);

// Retrieve the API Gateway endpoint from environment variables
const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_1;

// Variable to hold the timeout ID for controlling the periodic updates
let timeoutId = null;

/**
 * Sends the current location of the user to AWS via API Gateway.
 * This function gets the user's geographical coordinates and sends them to a specified endpoint.
 */
async function sendLocationToAWS() {
	try {
		const user = await getCurrentUser();
		const sub = user.userId; // User's unique identifier

		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const response = await fetch(API_GATEWAY_ENDPOINT, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ sub, latitude, longitude }),
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					console.log(
						'Location data successfully sent to AWS:',
						await response.json()
					);
					// Schedule the next update only after the current one succeeds
					timeoutId = setTimeout(sendLocationToAWS, 10000);
				},
				(error) => {
					console.error('Error getting current location:', error);
					clearTimeout(timeoutId);
				},
				{
					enableHighAccuracy: true,
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	} catch (error) {
		console.error('Failed to send location data to AWS:', error);
		clearTimeout(timeoutId); // Stop the process to avoid further errors
	}
}

/**
 * Starts the process of sending location data periodically to AWS.
 * If there is an existing process running, it will be stopped before starting a new one.
 */
export default async function sendPeriodically() {
	if (timeoutId !== null) {
		clearTimeout(timeoutId); // Clear any existing timeout to prevent duplicates
	}
	await sendLocationToAWS(); // Start sending location data
}

/**
 * Stops the periodic sending of location data to AWS.
 */
export function stopSendingLocationPeriodically() {
	if (timeoutId !== null) {
		clearTimeout(timeoutId);
		timeoutId = null;
	}
}
