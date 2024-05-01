import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GetEvent from './getAssignedEvent';
import './alertModal.css';
import PropTypes from 'prop-types';
import acceptEvent from './acceptEvent';

/**
 * A modal component that alerts the user to a nearby event and offers an option to accept or decline the event.
 * If accepted, it will update the destination to the event's location.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.updateDestination - Function to update the destination on map.
 */
export default function ShowAlertModal({ updateDestination }) {
	const [show, setShow] = useState(false); // Controls the visibility of the modal
	const [event] = GetEvent(true); // Custom hook to fetch the assigned event

	useEffect(() => {
		if (event) {
			console.log('New event received, resetting hasNavigated flag');
			sessionStorage.setItem('hasNavigated', false); // Reset navigation flag when a new event is received
		}
		const hasNavigated = sessionStorage.getItem('hasNavigated') === 'true';
		console.log('hasNavigated:', hasNavigated);

		if (event && !hasNavigated) {
			console.log('Show alert modal');
			setShow(true); // Show the modal if there's an event and user hasn't navigated away
		} else if (event && hasNavigated) {
			console.log('No alert modal - has navigated');
		} else if (!event) {
			console.log('No alert modal - no event');
		} else {
			console.log('No alert modal - unknown reason');
		}
	}, [event]); // Re-run effect when the event changes

	/**
	 * Handles the closing of the modal and sets navigation flag to true.
	 */
	const handleClose = () => {
		sessionStorage.setItem('hasNavigated', true);
		setShow(false);
	};

	/**
	 * Handles the navigation to the event's location and closes the modal.
	 */
	const handleNavigate = () => {
		if (event) {
			updateDestination({
				lat: event.event_latitude,
				lng: event.event_longitude,
			});
			handleClose(); // Close modal after setting destination
		}
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
						<p>Emergency nearby</p>
						{event ? (
							<div>
								<p>
									<strong>{event.event_name}</strong>
								</p>
								<h6>{event.event_description}</h6>
							</div>
						) : (
							<p>No event assigned.</p>
						)}
						<hr />
						<p className="mb-0">
							Click ACCEPT to acknowledge and begin navigation
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button id="decline" className="btn-decline" onClick={handleClose}>
						DECLINE
					</Button>
					<Button
						id="accept"
						className="btn-accept"
						onClick={() => {
							acceptEvent(event.id);
							handleNavigate();
						}}
					>
						ACCEPT
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

ShowAlertModal.propTypes = {
	updateDestination: PropTypes.func.isRequired,
};
