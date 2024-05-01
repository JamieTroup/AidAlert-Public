import { useState } from 'react';

/**
 * Manages a list of emergency events.
 *
 * @param {Object[]} initialEvents - Initial set of events.
 * @returns {{locations: Object[], addEmergencyEvent: Function}} Object containing the current events and a function to add a new event.
 */
export const useEmergencyEvents = (initialEvents = []) => {
	const [locations, setLocations] = useState(initialEvents);

	/**
	 * Adds a new event to the list.
	 *
	 * @param {{latLng: {lat: Function, lng: Function}}} event - Object representing the new event, containing latitude and longitude.
	 */
	const addEmergencyEvent = (event) => {
		const newEvent = {
			name: `Emergency Event ${locations.length + 1}`,
			latitude: event.latLng.lat(),
			longitude: event.latLng.lng(),
			showInfoWindow: false,
		};
		setLocations((prevLocations) => [...prevLocations, newEvent]);
	};

	return { locations, addEmergencyEvent };
};
