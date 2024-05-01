// Imports from React and React Google Maps API
import React, { useState } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
// Component and utility imports
import EventModal from './eventModal';
import uploadEvent from './uploadEvent';
import useFetchLocations from './getLocations';
import useFetchEvents from './getEvents';
import deleteEvent from './deleteEvent';
import styles from './dashboard.module.css';
import EventMarker from './eventMarker';
import { v4 as uuidv4 } from 'uuid';
import icon from './images/bluedotv2.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyNavbar from './myNavBar.js';
import RespondersOffcanvas from './respondersOffcanvas.js';
import EventsOffcanvas from './eventsOffcanvas.js';
import { sendNotification } from './sendNotification.js';
import PropTypes from 'prop-types';

// Default map center coordinates
const defaultCenter = { lat: 56.457677, lng: -2.980075 };
// Configuration for Google Maps API Loader
const loaderOptions = {
	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	libraries: ['places'],
};

/**
 * The Dashboard component renders the main interface of the application,
 * including map, markers, and modals for event management.
 */
function Dashboard() {
	// State hooks for various component functionalities
	// eslint-disable-next-line no-unused-vars
	const [map, setMap] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('add'); // "add" or "edit"
	const [editingEvent, setEditingEvent] = useState(null);
	const { isLoaded } = useJsApiLoader(loaderOptions);
	const [locations, setLocations] = useFetchLocations(isLoaded);
	const [events, setEvents] = useFetchEvents(isLoaded);
	const [mapCenter, setMapCenter] = useState(defaultCenter);
	const [zoomLevel, setZoomLevel] = useState(17);
	const [showRespondersOffcanvas, setShowRespondersOffcanvas] = useState(false);
	const [showEventsOffcanvas, setShowEventsOffcanvas] = useState(false);

	// Toggles the visibility of offcanvas components
	const toggleRespondersOffcanvas = () =>
		setShowRespondersOffcanvas((prev) => !prev);
	const toggleEventsOffcanvas = () => setShowEventsOffcanvas((prev) => !prev);

	// Handles adding a new event via map click
	const handleMapClick = (event) => {
		setIsModalOpen(true);
		setModalType('add');
		setEditingEvent({
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		});
	};

	// Initiates the event editing process
	const handleEdit = (event) => {
		setIsModalOpen(true);
		setModalType('edit');
		setEditingEvent(event);
	};

	/**
	 * Attempts to delete an event and updates the state accordingly.
	 * @param {string} eventId - The ID of the event to be deleted.
	 */
	const handleDelete = async (eventId) => {
		try {
			await deleteEvent(eventId);
			console.log('Event deleted successfully');
			setEvents((currentEvents) =>
				currentEvents.filter((event) => event.event_id !== eventId)
			);
		} catch (error) {
			console.error('Error deleting the event:', error);
		}
	};

	// Handles marker icon click events
	const handleIconClick = (location) => {
		setLocations(
			locations.map((loc) =>
				loc.name === location.name
					? { ...loc, showInfoWindow: !loc.showInfoWindow }
					: loc
			)
		);
	};

	/**
	 * Submits the event details form for adding or editing an event.
	 * @param {Object} details - The details of the event.
	 */
	const handleSubmit = async (details) => {
		const eventDetails = {
			...details,
			lat: details.lat || editingEvent.lat,
			lng: details.lng || editingEvent.lng,
			assigned_responders: details.assigned_responders,
		};

		if (modalType === 'add') {
			await addEvent(eventDetails, setEvents, events, locations);
		} else if (modalType === 'edit') {
			await editEvent(eventDetails, setEvents, events, editingEvent);
		}

		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	// Moves the map to the specified location
	const goToLocation = (lat, lng) => {
		setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
		setZoomLevel(17);
		setTimeout(() => setZoomLevel(18.5), 0);
	};

	// Customizes the map marker icon
	/* eslint-disable indent */
	const customIcon = isLoaded
		? {
				url: icon,
				scaledSize: new window.google.maps.Size(30, 30),
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(15, 15),
			}
		: {};
	/* eslint-enable indent */

	return (
		<>
			<MyNavbar
				onToggleOffcanvasResponders={toggleRespondersOffcanvas}
				onToggleOffcanvasEvents={toggleEventsOffcanvas}
			/>
			<RespondersOffcanvas
				show={showRespondersOffcanvas}
				handleClose={toggleRespondersOffcanvas}
				goToLocation={goToLocation}
			/>
			<EventsOffcanvas
				show={showEventsOffcanvas}
				handleClose={toggleEventsOffcanvas}
				goToLocation={goToLocation}
			/>
			<div style={{ position: 'relative' }}>
				<EventModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleSubmit}
					eventDetails={modalType === 'edit' ? editingEvent : null}
					mode={modalType}
				/>

				{isLoaded && (
					<div
						className="container-fluid p-0"
						style={{ height: 'calc(100vh - 70px)' }}
					>
						<div className="d-flex flex-column" style={{ height: '100%' }}>
							<GoogleMap
								mapContainerClassName={styles.container}
								center={mapCenter}
								zoom={zoomLevel}
								options={{
									disableDefaultUI: true,
									zoomControl: true,
									mapTypeControl: true,
									scaleControl: false,
									streetViewControl: false,
									rotateControl: false,
									fullscreenControl: false,
									clickableIcons: false,
									draggable: true,
									scrollwheel: false,
								}}
								onLoad={(map) => setMap(map)}
								onClick={handleMapClick}
							>
								{events &&
									events.map((event) => (
										<EventMarker
											key={event.event_id}
											event={event}
											onEdit={handleEdit}
											onDelete={handleDelete}
										/>
									))}
								{locations &&
									locations.map((location) => (
										<LocationMarker
											key={location.id}
											location={location}
											customIcon={customIcon}
											onMarkerClick={handleIconClick}
										/>
									))}
								{selectedEvent && (
									<EventInfoWindow
										event={selectedEvent}
										onEdit={handleEdit}
										onDelete={handleDelete}
										onClose={() => setSelectedEvent(null)}
									/>
								)}
							</GoogleMap>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Dashboard;

/**
 * Renders an information window for an event.
 * @param {Object} props - Component props containing event details and handlers.
 */
function EventInfoWindow({ event, onEdit, onDelete, onClose }) {
	return (
		<InfoWindow
			position={{
				lat: parseFloat(event.latitude) + 0.0001,
				lng: parseFloat(event.longitude),
			}}
			onCloseClick={onClose}
		>
			<div>
				<h2>{event.name}</h2>
				<p>{event.description}</p>
				<button onClick={() => onEdit(event)}>Edit</button>
				<button onClick={() => onDelete(event.event_id)}>Delete</button>
			</div>
		</InfoWindow>
	);
}

EventInfoWindow.propTypes = {
	event: PropTypes.shape({
		event_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		latitude: PropTypes.string.isRequired,
		longitude: PropTypes.string.isRequired,
	}).isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

/**
 * Renders a marker for a specific location on the map, including an optional InfoWindow.
 * @param {Object} props - Component props containing location details and handlers.
 */
function LocationMarker({ location, onMarkerClick, customIcon }) {
	return (
		<>
			<Marker
				key={location.id}
				position={{
					lat: parseFloat(location.latitude),
					lng: parseFloat(location.longitude),
				}}
				icon={customIcon}
				onClick={() => onMarkerClick(location)}
			/>
			{location.showInfoWindow && (
				<InfoWindow
					position={{
						lat: parseFloat(location.latitude) + 0.0001,
						lng: parseFloat(location.longitude),
					}}
					onCloseClick={() => onMarkerClick(location)}
				>
					<div>
						<h2>{location.name}</h2>
						<h2>{location.phone_number}</h2>
					</div>
				</InfoWindow>
			)}
		</>
	);
}

LocationMarker.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		phone_number: PropTypes.string.isRequired,
		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,
		showInfoWindow: PropTypes.bool,
	}).isRequired,
	onMarkerClick: PropTypes.func.isRequired,
	customIcon: PropTypes.object,
};

/**
 * Asynchronously adds a new event to the system.
 * @param {Object} details - The details of the event to be added.
 * @param {Function} setEvents - State setter function for updating the events array.
 * @param {Array} events - The current array of events.
 * @param {Array} locations - The array of possible event locations.
 */
const addEvent = async (eventDetails, setEvents, events, locations) => {
	try {
		// Assuming `setEvents` updates state and that `events` is your state holding current events
		const newEvent = {
			...eventDetails,
			event_id: uuidv4(), // Generate a unique ID for the new event
			is_accepted: false,
			has_arrived: false,
		};
		setEvents((currentEvents) => [...currentEvents, newEvent]);
		console.log('Event added:', newEvent);

		eventDetails.assigned_responders.forEach((responderId) => {
			const responder = locations.find((loc) => loc.id === responderId);
			if (responder) {
				sendNotification(responder.fcmToken);
			} else if (!responder) {
				console.error('Responder not found:', responderId);
			} else {
				console.error('Failed to send notification to:', responderId);
			}
		});

		await uploadEvent(newEvent);
	} catch (error) {
		console.error('Failed to add event:', error);
	}
};

/**
 * Asynchronously edits an existing event in the system.
 * @param {Object} details - The updated details of the event.
 * @param {Array} events - The current array of events.
 * @param {Object} editingEvent - The event currently being edited.
 */
const editEvent = async (eventDetails, setEvents, events, editingEvent) => {
	try {
		const updatedEvents = events.map((event) =>
			event.event_id === editingEvent.event_id
				? { ...event, ...eventDetails }
				: event
		);

		setEvents(updatedEvents);
		console.log('Editing event:', eventDetails);
		await uploadEvent({ ...eventDetails, event_id: editingEvent.event_id });
	} catch (error) {
		console.error('Failed to edit event:', error);
	}
};
