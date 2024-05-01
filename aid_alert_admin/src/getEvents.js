import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching events from a server. It fetches events repeatedly every 5 seconds
 * as long as the component that uses this hook is loaded (`isLoaded` is true).
 *
 * @param {boolean} isLoaded - Determines if the dependent component is loaded and ready to fetch data.
 * @returns {Array} Returns the stateful values `events` and the `setEvents` function to update them.
 */
function useFetchEvents(isLoaded) {
	const [events, setEvents] = useState([]); // State to hold the events data

	useEffect(() => {
		// Exit the effect early if not loaded to avoid unnecessary fetches
		if (!isLoaded) return;

		// Function to fetch events from the API
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					process.env.REACT_APP_API_GATEWAY_ENDPOINT_3,
					{
						method: 'GET',
					}
				);
				if (!response.ok) throw new Error('Network response was not ok');
				const data = await response.json();
				const formattedEvents = data.map((event) => ({
					...event,
					id: event.event_id,
					event_latitude: Number(event.event_latitude),
					event_longitude: Number(event.event_longitude),
				}));
				setEvents(formattedEvents);
			} catch (error) {
				console.error('Failed to fetch events:', error);
			}
		};

		fetchEvents();
		// Set up an interval to fetch events every 5000 milliseconds
		const intervalId = setInterval(fetchEvents, 5000);

		// Clean up function to clear the interval when the component unmounts
		return () => clearInterval(intervalId);
	}, [isLoaded]); // Only re-run the effect if `isLoaded` changes

	return [events, setEvents];
}

export default useFetchEvents;
