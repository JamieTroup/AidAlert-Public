import { getCurrentUser } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure AWS Amplify with the exported settings from aws-exports
Amplify.configure(awsExports);

const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_4;

/**
 * Uploads the FCM token of the current user to the specified API Gateway endpoint.
 * This token is used for push notification purposes.
 *
 * @param {string} token - The FCM token to be uploaded.
 */
export async function uploadFCMToken(token) {
	/**
	 * Retrieves the current authenticated user's unique identifier (sub).
	 *
	 * @returns {Promise<string>} A promise that resolves with the user's unique identifier.
	 * @throws Will throw an error if the user is not authenticated or another error occurs.
	 */
	async function getCurrentUserSub() {
		try {
			const user = await getCurrentUser();
			return user.userId;
		} catch (error) {
			console.error('Error getting current authenticated user:', error);
			throw new Error(
				'Failed to get current user. User might not be authenticated.'
			);
		}
	}

	let sub;
	try {
		sub = await getCurrentUserSub();
		if (!sub) {
			console.error('No user sub found. Cannot upload FCM token.');
			return;
		}
	} catch (error) {
		console.error('Failed to get user sub:', error);
		return;
	}

	try {
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sub, fcmToken: token }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		console.log('FCM token successfully uploaded to AWS.');
	} catch (error) {
		// Handle network errors and other fetch-related issues
		if (error.name === 'TypeError') {
			console.error('Failed to fetch. Network might be down:', error);
		} else {
			console.error('Failed to upload FCM token to AWS:', error);
		}
	}
}
