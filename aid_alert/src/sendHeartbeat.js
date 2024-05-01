import { getCurrentUser } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure Amplify with the AWS configuration exported from the aws-exports file
Amplify.configure(awsExports);

// Retrieve the API Gateway endpoint from environment variables
const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_5;

// State variable to control the running state of the heartbeat signal
let isRunning = false;

/**
 * Sends a heartbeat signal to the configured API endpoint.
 * This function is typically used to update the server with the user's current activity status.
 */
export async function updateHeartbeat() {
	/**
	 * Retrieves the current user's unique identifier from AWS Cognito.
	 *
	 * @returns {Promise<string>} A promise that resolves with the user's unique identifier.
	 * @throws Will throw an error if unable to retrieve the user.
	 */
	async function getCurrentUserSub() {
		try {
			const user = await getCurrentUser();
			return user.userId;
		} catch (error) {
			console.error('Error getting current authenticated user:', error);
			throw error;
		}
	}

	const sub = await getCurrentUserSub();
	if (!sub) {
		console.error('No user sub found. Cannot upload Heartbeat.');
		return;
	}

	try {
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				sub,
				last_heartbeat: new Date().toISOString(), // Sends the current timestamp as the last heartbeat
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		console.error('Failed to upload Heartbeat to AWS:', error);
	}
}

/**
 * Starts sending heartbeat signals at a specified interval.
 *
 * @param {number} intervalMillis - The interval in milliseconds between each heartbeat signal.
 */
export function startHeartbeat(intervalMillis = 20000) {
	if (isRunning) {
		console.log('Heartbeat is already running');
		return;
	}

	isRunning = true;
	setInterval(() => {
		updateHeartbeat().catch((error) => {
			console.error('Heartbeat update failed:', error);
			isRunning = false; // Reset running state on failure
		});
	}, intervalMillis);
}
