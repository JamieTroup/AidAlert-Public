import React, { useState } from 'react';
import icon from './images/check.png'; // Importing a checkmark icon
import ShowArrivalModal from './arrivalModal';
import PropTypes from 'prop-types';

/**
 * A control component that displays a button to trigger an arrival modal.
 * When clicked, it opens a modal to confirm arrival at a destination and allows stopping navigation.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.stopNavigation - Function to stop navigation.
 */
function ArrivalControl({ stopNavigation }) {
	const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

	/**
	 * Handles the click event on the arrival button to show the modal.
	 */
	const handleButtonClick = () => {
		setShowModal(true);
	};

	/**
	 * Handles the closure of the modal and potentially additional cleanup actions.
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
					paddingTop: '10px 0',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onClick={handleButtonClick}
			>
				<img
					src={icon}
					alt="Arrival button"
					style={{
						marginRight: '1px',
						marginTop: '10px',
						width: '75px',
						height: '75px',
					}}
				/>
			</button>
			<ShowArrivalModal
				show={showModal}
				handleClose={handleModalClose}
				stopNavigation={stopNavigation} // Pass `stopNavigation` function to the modal
			/>
		</>
	);
}

export default ArrivalControl;

ArrivalControl.propTypes = {
	stopNavigation: PropTypes.func.isRequired, // PropType validation for `stopNavigation`
};
