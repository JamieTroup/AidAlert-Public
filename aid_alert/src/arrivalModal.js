import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './arrivalModal.css';
import GetEvent from './getAssignedEvent';
import PropTypes from 'prop-types';
import updateArrived from './updateArrived';

/**
 * A modal component that confirms whether the user has arrived at the designated emergency location.
 * Allows the user to mark their arrival and stops navigation.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.show - Controls visibility of the modal.
 * @param {Function} props.handleClose - Function to close the modal.
 * @param {Function} props.stopNavigation - Function to stop navigation.
 */
export default function ShowArrivalModal({
	show,
	handleClose,
	stopNavigation,
}) {
	const [event] = GetEvent(true); // Fetch the assigned event
	const event_id = event ? event.id : null; // Extract event ID if event exists

	/**
	 * Handles the logic when the user confirms arrival:
	 * Marks the event as arrived, stops navigation, and closes the modal.
	 */
	const handleArrivalConfirmation = () => {
		if (event_id) {
			updateArrived(event_id); // Mark the event as arrived in the database
		}
		stopNavigation(); // Stop navigation
		handleClose(); // Close the modal
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				centered
				dialogClassName="alert-modal"
			>
				<Modal.Body>
					<div className="alert alert-warning" role="alert">
						<h1 className="alert-heading">Arrival Confirmation</h1>
						<p>Have you arrived at the emergency?</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button id="no" className="btn-no" onClick={handleClose}>
						NO
					</Button>
					<Button
						id="yes"
						className="btn-yes"
						onClick={handleArrivalConfirmation}
					>
						YES
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

ShowArrivalModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	stopNavigation: PropTypes.func.isRequired,
};
