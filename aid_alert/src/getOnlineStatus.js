import { getCurrentUser } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure Amplify with the AWS exports
Amplify.configure(awsExports);

const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_6;

/**
 * Fetches the online status of the current user from an AWS API Gateway endpoint.
 * This status is based on whether the user's last interaction is within an expected timeframe.
 *
 * @returns {Promise<boolean>} A promise that resolves to the user's online status (true or false).
 */
export async function getOnlineStatus() {
	let online_status;

	/**
	 * Retrieves the current authenticated user's unique identifier.
	 *
	 * @returns {Promise<string>} A promise that resolves with the user's unique identifier.
	 */
	async function getCurrentUserSub() {
		try {
			const user = await getCurrentUser();
			return user.userId;
		} catch (error) {
			console.error('Error getting current authenticated user:', error);
			throw error; // Propagate the error for further handling
		}
	}

	const sub = await getCurrentUserSub();
	if (!sub) {
		console.error('No user sub found. Cannot check online status.');
		return null;
	}

	try {
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sub }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		online_status = (await response.text()) === 'true';
		// Uncomment below for debug information about online status retrieval
		// console.log('Online status successfully retrieved from AWS:', online_status);
	} catch (error) {
		console.error('Failed to get online status:', error);
		return null; // Return null to indicate the failure in fetching the online status
	}
	return online_status;
}
