import React from 'react';
import icon from './images/phone.png'; // Importing the phone icon used in the button

/**
 * CallControl component that renders a button to initiate a phone call to a predefined number.
 */
function CallControl() {
	const phoneNumber = 'redacted'; // Define the phone number as a constant

	/**
	 * Initiates a call to the specified phone number by setting the window's location.
	 */
	const initiateCall = () => {
		window.location.href = `tel:${phoneNumber}`; // Standard way to initiate a telephone call via HTML
	};

	return (
		<button
			style={{
				backgroundColor: 'transparent',
				border: 'none',
				cursor: 'pointer',
				paddingTop: '10px', // Corrected padding format for clarity
				display: 'flex', // Ensure the content is centered correctly
				alignItems: 'center',
				justifyContent: 'center',
			}}
			onClick={initiateCall}
		>
			<img
				src={icon}
				alt="Initiate call" // Added alt text for accessibility
				style={{
					marginRight: '1px',
					marginTop: '10px',
					width: '55px',
					height: '57px',
				}}
			/>
		</button>
	);
}

export default CallControl;
