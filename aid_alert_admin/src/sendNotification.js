import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure Amplify with the AWS exports configuration
Amplify.configure(awsExports);

// Define the API gateway endpoint from the environment variables
const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_6;

/**
 * Sends a notification request to a specified Firebase Cloud Messaging token via an AWS API Gateway endpoint.
 * This function posts the FCM token to the endpoint and handles the response.
 *
 * @param {string} fcmToken - The Firebase Cloud Messaging token to which the notification will be sent.
 */
export async function sendNotification(fcmToken) {
	// Check if the token is present and valid
	if (!fcmToken || fcmToken === 'null') {
		console.error('No token found. Cannot send notification.');
		return;
	}

	try {
		console.log('Sending notification request...');
		// Make a POST request to the API Gateway with the FCM token
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ fcmToken }),
		});

		// Throw an error if the response is not OK
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		// Log the successful upload and the response from the server
		console.log(
			'Notification request successfully uploaded to AWS...',
			await response.json()
		);
	} catch (error) {
		// Log any errors that occur during the fetch operation
		console.error('Failed to upload notification request to AWS:', error);
	}
}
