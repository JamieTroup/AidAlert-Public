import { useState, useEffect } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';

/**
 * Custom hook for fetching an event for the current user.
 * It periodically checks for the latest event assigned to the user and updates the state.
 *
 * @param {boolean} isLoaded - Determines if the component that uses this hook is ready to fetch data.
 * @returns {[Object, Function]} The event object and a setter function to update it.
 */
function GetEvent(isLoaded) {
	const [event, setEvent] = useState(null);

	useEffect(() => {
		if (!isLoaded) return; // Exit early if the API or dependencies aren't ready

		const fetchEvents = async () => {
			try {
				const currentUserSub = await getCurrentUserSub();
				const response = await fetch(
					process.env.REACT_APP_API_GATEWAY_ENDPOINT_3,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ sub: currentUserSub }),
					}
				);
				if (!response.ok) throw new Error('Network response was not ok');
				const data = await response.json();

				if (Array.isArray(data) && data.length > 0) {
					const newEvent = {
						...data[0],
						id: data[0].event_id,
						event_latitude: Number(data[0].event_latitude),
						event_longitude: Number(data[0].event_longitude),
						event_description: data[0].event_description,
						event_name: data[0].event_name,
					};

					// Update the event if the new event data is different from the current event
					if (JSON.stringify(newEvent) !== JSON.stringify(event)) {
						setEvent(newEvent);
					}
				} else {
					setEvent(null); // Set event to null if no data is returned
				}
			} catch (error) {
				console.error('Failed to fetch events:', error);
			}
		};

		fetchEvents();
		const intervalId = setInterval(fetchEvents, 3000); // Refresh event data every 3000 milliseconds

		return () => clearInterval(intervalId); // Cleanup the interval on unmount
	}, [event, isLoaded]); // Depend on `event` and `isLoaded` to control effect re-execution

	return [event, setEvent];
}

export default GetEvent;

/**
 * Helper function to retrieve the current user's unique identifier from AWS Amplify.
 *
 * @returns {Promise<string>} A promise that resolves with the user's unique identifier.
 */
async function getCurrentUserSub() {
	try {
		const user = await getCurrentUser();
		return user.userId; // Assuming `userId` is the correct identifier
	} catch (error) {
		console.error('Error getting current authenticated user:', error);
		throw error; // Propagate the error for further handling
	}
}
