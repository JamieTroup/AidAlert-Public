/* eslint-disable indent */
// React and Bootstrap imports
import React from 'react';
import { Offcanvas, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
// Custom hooks and utilities
import useFetchEvents from './getEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './eventsOffcanvas.css';

/**
 * EventsOffcanvas component displays a sidebar with event details.
 * It uses an offcanvas layout to show events fetched based on the 'show' prop.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls the visibility of the offcanvas
 * @param {Function} props.handleClose - Function to close the offcanvas
 * @param {Function} props.goToLocation - Function to navigate the map to the event location
 */
const EventsOffcanvas = ({ show, handleClose, goToLocation }) => {
	const [events] = useFetchEvents(show); // Fetch events when the offcanvas is shown

	return (
		<Offcanvas
			show={show}
			onHide={handleClose}
			placement="end"
			backdrop={false}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Events</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				{events.length > 0 ? (
					events.map((event) => (
						<Card key={event.id} className="mb-3">
							<Card.Body>
								<Card.Title>
									<FontAwesomeIcon icon={faCalendarAlt} /> {event.event_name}
								</Card.Title>
								<Card.Text>{event.event_description}</Card.Text>
								<div className="progress-container">
									<div className="progress-bar">
										<div
											className={`progress-bar-fill ${event.has_arrived ? 'arrived' : event.is_accepted ? 'accepted' : event.assigned_responder && event.assigned_responder !== 'default_responder' ? 'assigned' : ''}`}
											style={{
												width: event.has_arrived
													? '100%'
													: event.is_accepted
														? '66%'
														: event.assigned_responder
															? '33%'
															: '0%',
											}}
										></div>
										<div
											className={`marker assigned ${event.assigned_responder ? 'active' : ''}`}
										></div>
										<div
											className={`marker accepted ${event.is_accepted ? 'active' : ''}`}
										></div>
										<div
											className={`marker arrived ${event.has_arrived ? 'active' : ''}`}
										></div>
									</div>
									<div className="progress-labels">
										<span className="label">Assigned</span>
										<span className="label">Accepted</span>
										<span className="label">Arrived</span>
									</div>
								</div>
								<br />
								<Button
									variant="primary"
									onClick={() =>
										goToLocation(
											parseFloat(event.event_latitude),
											parseFloat(event.event_longitude)
										)
									}
								>
									Go to event
								</Button>
							</Card.Body>
						</Card>
					))
				) : (
					<p>No events found.</p>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	);
};

// PropTypes for type-checking
EventsOffcanvas.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	goToLocation: PropTypes.func.isRequired,
};

// Export component as default
export default EventsOffcanvas;
