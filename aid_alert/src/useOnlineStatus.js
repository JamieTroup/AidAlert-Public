import { useState, useCallback } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_2;

/**
 * Custom hook to manage and update the online status of the current user to AWS.
 * Provides methods to toggle online status and to set it as offline.
 */
export const useOnlineStatus = () => {
	const [isOnline, setIsOnline] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	/**
	 * Retrieves the current authenticated user's unique identifier (sub).
	 *
	 * @returns {Promise<string>} A promise that resolves with the user's unique identifier.
	 */
	async function getCurrentUserSub() {
		try {
			const user = await getCurrentUser();
			return user.userId;
		} catch (error) {
			console.error('Error getting current authenticated user:', error);
			throw error; // Forwarding errors to handle them gracefully outside
		}
	}

	/**
	 * Sends the current online status of the user to AWS.
	 *
	 * @param {boolean} isOnline - The current online status to be updated on AWS.
	 */
	const updateOnlineStatusToAWS = useCallback(async (isOnline) => {
		console.log('Updating online status to AWS...');
		let sub;
		try {
			sub = await getCurrentUserSub();
			if (!sub) {
				console.error('No user sub found. Cannot update online status.');
				return;
			}
		} catch (error) {
			console.error('Failed to retrieve user sub:', error);
			return; // Exit if we cannot get the user sub
		}

		try {
			console.log('Sending:', JSON.stringify({ sub, online_status: isOnline }));
			const response = await fetch(API_GATEWAY_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sub,
					online_status: isOnline,
				}),
			});

			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			console.log(
				'Online status',
				isOnline,
				'successfully updated to AWS:',
				await response.json()
			);
		} catch (error) {
			console.error('Failed to update online status to AWS:', error);
		}
	}, []);

	/**
	 * Toggles the online status of the user and sends the update to AWS.
	 */
	const toggleOnlineStatus = async () => {
		const newStatus = !isOnline;
		setIsOnline(newStatus);
		setIsButtonDisabled(true);
		await updateOnlineStatusToAWS(newStatus);
		setTimeout(() => setIsButtonDisabled(false), 1000); // Re-enable button after 1 second
	};

	/**
	 * Sets the user's online status to offline and updates AWS.
	 */
	const offlineStatus = async () => {
		setIsOnline(false);
		await updateOnlineStatusToAWS(false);
	};

	return { isOnline, toggleOnlineStatus, offlineStatus, isButtonDisabled };
};
