import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import GetEvent from './getAssignedEvent'; // Hook to fetch the assigned event
import './infoModal.css'; // Styling for the modal
import PropTypes from 'prop-types';

/**
 * ShowInfoModal component displays a modal with detailed information about an event.
 * It fetches event data using a custom hook and displays it when the modal is shown.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.show - Controls the visibility of the modal.
 * @param {Function} props.handleClose - Function to call when closing the modal.
 */
export default function ShowInfoModal({ show, handleClose }) {
	const [event] = GetEvent(true); // Use custom hook to fetch the current event details

	/**
	 * Wrapper function to handle modal closure.
	 */
	const close = () => {
		handleClose(); // Calls the passed handleClose function to close the modal
	};

	return (
		<>
			<Modal
				show={show}
				onHide={close}
				centered // Centers the modal vertically and horizontally on the screen
				dialogClassName="alert-modal" // Custom class for specific styling
			>
				<Modal.Body>
					<div className="alert alert-warning" role="alert">
						{event ? (
							<div>
								<h1 className="alert-heading">{event.event_name}</h1>
								<p>{event.event_description}</p>
							</div>
						) : (
							<p>No event assigned.</p> // Display if no event data is available
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button id="return" className="btn-return" onClick={close}>
						CLOSE
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

ShowInfoModal.propTypes = {
	show: PropTypes.bool.isRequired, // Boolean to control the visibility of the modal
	handleClose: PropTypes.func.isRequired, // Function to handle closing the modal
};
