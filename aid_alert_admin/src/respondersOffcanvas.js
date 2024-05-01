import React from 'react';
import { Offcanvas, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useFetchLocations from './getLocations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * RespondersOffcanvas component displays a sidebar with a list of responder locations.
 * It shows information about responders and provides functionality to navigate to their locations.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls the visibility of the offcanvas
 * @param {Function} props.handleClose - Function to close the offcanvas
 * @param {Function} props.goToLocation - Function to navigate the map to the responder location
 */
const RespondersOffcanvas = ({ show, handleClose, goToLocation }) => {
	const [locations] = useFetchLocations(show); // Fetch locations when the offcanvas is shown

	return (
		<Offcanvas
			show={show}
			onHide={handleClose}
			placement="end"
			backdrop={false}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Responders</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				{locations.length > 0 ? (
					locations.map((location) => (
						<Card key={location.id} className="mb-3">
							<Card.Body>
								<Card.Title>
									<FontAwesomeIcon icon={faMapMarkedAlt} /> {location.name}
								</Card.Title>
								<Button
									variant="primary"
									onClick={() =>
										goToLocation(
											parseFloat(location.latitude),
											parseFloat(location.longitude)
										)
									}
								>
									Go to location
								</Button>
							</Card.Body>
						</Card>
					))
				) : (
					<p>No locations found.</p>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	);
};

// PropTypes for type-checking
RespondersOffcanvas.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	goToLocation: PropTypes.func.isRequired,
};

export default RespondersOffcanvas;
