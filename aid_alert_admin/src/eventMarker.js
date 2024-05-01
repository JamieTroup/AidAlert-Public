// Imports from React and React Google Maps API
import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';

// Local asset imports
import marker from './images/marker.png';

/**
 * EventMarker component to display a single event marker on the map.
 * This component handles both the marker itself and the InfoWindow that appears on click.
 *
 * @param {Object} props - Component props
 * @param {Object} props.event - Event data
 * @param {Function} props.onEdit - Handler to edit the event
 * @param {Function} props.onDelete - Handler to delete the event
 */
function EventMarker({ event, onEdit, onDelete }) {
	// Local state to manage the visibility of the InfoWindow
	const [selected, setSelected] = useState(false);

	return (
		<>
			<Marker
				key={event.id}
				position={{
					lat: parseFloat(event.event_latitude),
					lng: parseFloat(event.event_longitude),
				}}
				onClick={() => setSelected(true)}
				icon={{
					url: marker,
					scaledSize: new window.google.maps.Size(30, 30),
				}}
			/>
			{selected && (
				<InfoWindow
					position={{
						lat: parseFloat(event.event_latitude),
						lng: parseFloat(event.event_longitude),
					}}
					onCloseClick={() => setSelected(false)}
				>
					<div>
						<h2>{event.event_name}</h2>
						<p>{event.event_description}</p>
						<button onClick={() => onEdit(event)}>Edit</button>
						<button onClick={() => onDelete(event.id)}>Delete</button>
					</div>
				</InfoWindow>
			)}
		</>
	);
}

// PropType validation for the EventMarker component
EventMarker.propTypes = {
	event: PropTypes.shape({
		id: PropTypes.string.isRequired,
		event_name: PropTypes.string.isRequired,
		event_description: PropTypes.string.isRequired,
		event_latitude: PropTypes.number.isRequired,
		event_longitude: PropTypes.number.isRequired,
	}).isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

// Exporting the EventMarker component as the default export
export default EventMarker;
