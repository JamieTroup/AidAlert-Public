import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching location data from a server. It fetches locations repeatedly every 5 seconds
 * as long as the dependent component that uses this hook is loaded (`isLoaded` is true).
 *
 * @param {boolean} isLoaded - Indicates whether the component using this hook is ready to fetch data.
 * @returns {Array} Returns the stateful values `locations` and the `setLocations` function to manage them.
 */
function useFetchLocations(isLoaded) {
	const [locations, setLocations] = useState([]); // State to hold the location data

	useEffect(() => {
		// Exit the effect early if not loaded to prevent unnecessary operations
		if (!isLoaded) return;

		// Function to fetch location data from the API
		const fetchLocations = async () => {
			try {
				const response = await fetch(
					process.env.REACT_APP_API_GATEWAY_ENDPOINT_1,
					{
						method: 'GET',
					}
				);
				if (!response.ok) throw new Error('Network response was not ok');
				const data = await response.json();
				const formattedLocations = data.map((location) => ({
					...location,
					id: location.sub, // Assign 'sub' as the unique identifier for each location
					latitude: Number(location.latitude),
					longitude: Number(location.longitude),
					fcmToken: String(location.fcmToken),
					phone_number: String(location.phone_number),
				}));
				setLocations(formattedLocations);
			} catch (error) {
				console.error('Failed to fetch locations:', error);
			}
		};

		fetchLocations();
		// Set up an interval to periodically fetch location data every 5000 milliseconds
		const intervalId = setInterval(fetchLocations, 5000);

		// Cleanup function to clear the interval when the component unmounts
		return () => clearInterval(intervalId);
	}, [isLoaded]); // Only re-run the effect if `isLoaded` changes

	return [locations, setLocations];
}

export default useFetchLocations;
