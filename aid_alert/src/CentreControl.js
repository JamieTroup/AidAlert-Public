import React from 'react';
import PropTypes from 'prop-types';
import icon from './images/centre.png'; // Importing the centering icon used in the button

/**
 * CentreControl Component
 * This component renders a button that, when clicked, re-centers a Google Map to a specified position.
 * It is designed to be used with Google Maps API where a map object and a current position are provided.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.map - The Google Map object instance to be re-centered.
 * @param {Object} props.currentPosition - The {lat, lng} object representing the geographical position to center the map on.
 */
function CentreControl({ map, currentPosition }) {
	/**
	 * Centers the map on the current position if both the map and position are provided.
	 */
	const recentreMap = () => {
		if (map && currentPosition) {
			map.panTo(currentPosition);
		}
	};

	return (
		<div
			style={{
				backgroundColor: '#fff',
				padding: '10px',
				borderRadius: '50%', // Updated for better clarity and standard practice
				width: '50px',
				height: '50px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
			}}
		>
			<button
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
					display: 'flex', // Ensuring that the button's contents are properly centered
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onClick={recentreMap}
			>
				<img
					src={icon}
					alt="Re-center map" // Added alt attribute for accessibility
					style={{
						width: '45px',
						height: '45px',
					}}
				/>
			</button>
		</div>
	);
}

export default CentreControl;

CentreControl.propTypes = {
	map: PropTypes.object, // The Google Map object
	currentPosition: PropTypes.shape({
		// More specific shape of the currentPosition prop
		lat: PropTypes.number.isRequired,
		lng: PropTypes.number.isRequired,
	}),
};
