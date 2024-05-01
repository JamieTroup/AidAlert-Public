import React, { useState } from 'react';
import icon from './images/info.png'; // Importing the icon used in the button
import ShowInfoModal from './infoModal'; // Importing the modal component that will be displayed

/**
 * InfoButton component that triggers an informational modal on click.
 * This component is typically used to provide users with additional details or help related to the application.
 */
function InfoButton() {
	const [showModal, setShowModal] = useState(false); // State to track the visibility of the modal

	/**
	 * Handles the click event on the button by setting the showModal state to true.
	 */
	const handleButtonClick = () => {
		setShowModal(true);
	};

	/**
	 * Handles closing the modal by setting the showModal state to false.
	 */
	const handleModalClose = () => {
		setShowModal(false);
	};

	return (
		<>
			<button
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
					display: 'flex', // Ensuring content is centered correctly within the button
					alignItems: 'center',
					justifyContent: 'center',
					padding: '10px 0', // Adjusted padding for consistency
				}}
				onClick={handleButtonClick}
			>
				<img
					src={icon}
					alt="Information" // Added alt text for accessibility
					style={{
						width: '75px',
						height: '75px',
					}}
				/>
			</button>
			<ShowInfoModal show={showModal} handleClose={handleModalClose} />
		</>
	);
}

export default InfoButton;
