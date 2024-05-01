import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component that calculates routes using the Google Maps Directions API.
 * It does not render anything to the DOM itself, but uses the results to execute a callback function.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.origin - The starting point for the directions.
 * @param {string} props.destination - The endpoint for the directions.
 * @param {string} props.travelMode - The mode of transport to be used for the directions.
 * @param {Function} props.directionsCallback - Callback function to handle the directions result.
 */
function Navigation({ origin, destination, travelMode, directionsCallback }) {
	React.useEffect(() => {
		// Initialize the Google Maps Directions service
		const directionsService = new window.google.maps.DirectionsService();

		// Request route directions
		directionsService.route(
			{
				origin,
				destination,
				travelMode,
			},
			(result, status) => {
				// Check the status of the directions request
				if (status === window.google.maps.DirectionsStatus.OK) {
					// If successful, execute the callback with the directions result
					directionsCallback(result);
				} else {
					// Log an error if the directions request fails
					console.error('Directions request failed due to ' + status);
				}
			}
		);
	}, [origin, destination, travelMode, directionsCallback]); // Effect dependencies

	// Since this component does not render anything visually,
	// it returns null and acts purely as a logic component.
	return null;
}

export default Navigation;

Navigation.propTypes = {
	origin: PropTypes.string.isRequired,
	destination: PropTypes.string.isRequired,
	travelMode: PropTypes.string.isRequired,
	directionsCallback: PropTypes.func.isRequired,
};
