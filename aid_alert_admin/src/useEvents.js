import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useEvents(initialEvents = []) {
	// State variables for managing events and editing state
	const [events, setEvents] = useState(initialEvents);
	const [editingEvent, setEditingEvent] = useState(null);
	const [modalType, setModalType] = useState('add');

	// Handler for map click event
	const handleMapClick = (event) => {
		setModalType('add');
		// Set the editing event with latitude and longitude from the clicked location
		setEditingEvent({
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		});
	};

	// Handler for editing an event
	const handleEdit = (event) => {
		setModalType('edit');
		// Set the event to be edited
		setEditingEvent(event);
	};

	// Handler for deleting an event
	const handleDelete = (eventId) => {
		// Filter out the event to be deleted
		setEvents(events.filter((event) => event.id !== eventId));
	};

	// Handler for submitting event details
	const handleSubmit = (details) => {
		if (modalType === 'add') {
			// If adding a new event
			setEvents([
				...events,
				{
					...details,
					id: uuidv4(), // Generate a unique ID for the new event
					latitude: editingEvent.lat,
					longitude: editingEvent.lng,
				},
			]);
		} else if (modalType === 'edit') {
			// If editing an existing event
			setEvents(
				events.map((event) =>
					event.id === editingEvent.id ? { ...event, ...details } : event
				)
			);
		}
		// Reset editing state after submission
		setEditingEvent(null);
	};

	// Return the state variables and event handlers
	return {
		events,
		handleMapClick,
		handleEdit,
		handleDelete,
		handleSubmit,
		editingEvent,
		modalType,
	};
}

export default useEvents;
