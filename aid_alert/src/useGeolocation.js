import { useEffect } from 'react';

/**
 * A custom React hook for tracking the user's current geolocation.
 *
 * This hook subscribes to the Geolocation API to continuously update the user's current
 * position. It only activates if the Google Maps API is loaded and geolocation is supported
 * by the user's browser. The hook updates the coordinates state with the new position whenever
 * the user's location changes.
 *
 * @param {boolean} isLoaded        - Indicates whether the Google Maps API has finished loading.
 * @param {Function} setCoordinates - A state setter function from useState() to update the
 *                                    coordinates state with the current position.
 */
const useGeolocation = (isLoaded, setCoordinates) => {
	useEffect(() => {
		// Defines a function to update the position using the Geolocation API
		const updatePosition = ({ coords }) => {
			const { latitude, longitude } = coords;
			const newPosition = { lat: latitude, lng: longitude };
			// console.log('New position:', newPosition);
			setCoordinates((prevState) => ({
				...prevState,
				currentPosition: newPosition,
			}));
		};

		// Error handling for geolocation errors
		const handleError = (error) => console.error('Geolocation error:', error);

		let watchId;
		// Starts watching the user's position if geolocation is available and the API is loaded
		if ('geolocation' in navigator && isLoaded) {
			watchId = navigator.geolocation.watchPosition(
				updatePosition,
				handleError,
				{ enableHighAccuracy: true }
			);
		} else if (!isLoaded) {
			console.log('Google Maps API is loading...');
		} else {
			alert('Geolocation is not supported by this browser.');
		}

		// Cleanup function to stop watching the position when the component unmounts or dependencies change
		return () => navigator.geolocation.clearWatch(watchId);
	}, [isLoaded, setCoordinates]); // List of dependencies for the useEffect hook
};

export default useGeolocation;
