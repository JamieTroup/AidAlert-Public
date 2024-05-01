import React, { useState, useEffect } from 'react';
import {
	GoogleMap,
	Marker,
	DirectionsRenderer,
	useJsApiLoader,
} from '@react-google-maps/api';
import icon from './images/bluedotv2.png';
import styles from './dashboard.module.css';
import sendPeriodically from './SendLocation';
import {
	defaultCenter,
	loaderOptions,
	mapOptions,
	customIcon,
} from './googleMapsConfig';
import useGeolocation from './useGeolocation';
import ShowAlertModal from './alertModal';
import CallControl from './CallButton';
import ArrivalControl from './ArrivalButton';
import InfoButton from './infoButton';
import CentreControl from './CentreControl';
import PropTypes from 'prop-types';

/**
 * The Dashboard component integrates Google Maps with multiple control elements for navigation,
 * location updates, and user interaction. It handles location tracking, route directions,
 * and provides UI controls to interact with the map.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.destination - Destination coordinates to navigate to.
 * @param {Function} props.updateDestination - Function to update the destination.
 * @param {Function} props.stopNavigation - Function to stop the navigation.
 * @param {boolean} props.isNavigating - State to indicate if navigation is active.
 */
function Dashboard({
	destination,
	updateDestination,
	stopNavigation,
	isNavigating,
}) {
	const [mapKey, setMapKey] = useState(Date.now()); // Used to force rerender of the map component

	const forceRerender = () => {
		setMapKey(Date.now()); // Trigger a rerender by updating the key
	};

	const [googleMapInstance, setGoogleMapInstance] = useState(null); // Holds the instance of the Google Map
	const [coordinates, setCoordinates] = useState({
		currentPosition: null,
		center: defaultCenter,
	});

	const [directionsResult, setDirectionsResult] = useState(null); // Stores the directions result from Google Maps API
	const { isLoaded } = useJsApiLoader(loaderOptions); // Indicates if the Google Maps API is loaded
	const [zoom, setZoom] = useState(17); // Map zoom level
	const [hasStartedSending, setHasStartedSending] = useState(false); // Indicates if the periodic location sending has started
	const [center, setCenter] = useState(defaultCenter); // Current center of the map
	const [initialCenteringDone, setInitialCenteringDone] = useState(false); // Ensures the map is centered on initial load

	useEffect(() => {
		// Effect to handle initial centering of the map on user's current position
		if (isLoaded && !initialCenteringDone && coordinates.currentPosition) {
			setCenter(coordinates.currentPosition);
			setInitialCenteringDone(true); // Prevent further automatic re-centering
		}
	}, [coordinates.currentPosition, isLoaded, initialCenteringDone]);

	useEffect(() => {
		// Start sending location periodically when the Google Maps API is loaded
		if (isLoaded && !hasStartedSending) {
			sendPeriodically();
			setHasStartedSending(true);
			console.log('Sending location periodically...');
		}
	}, [isLoaded, hasStartedSending]);

	useGeolocation(isLoaded, setCoordinates); // Custom hook to track and update user's geolocation

	useEffect(() => {
		// Effect to handle routing via Google Maps Directions API
		if (
			isLoaded &&
			coordinates.currentPosition &&
			destination &&
			isNavigating
		) {
			const directionsService = new window.google.maps.DirectionsService();

			directionsService.route(
				{
					origin: coordinates.currentPosition,
					destination: destination,
					travelMode: window.google.maps.TravelMode.WALKING,
				},
				(result, status) => {
					if (status === window.google.maps.DirectionsStatus.OK) {
						setDirectionsResult(result);
					} else {
						console.error(`Failed to fetch directions: ${status}`);
					}
				}
			);
		}
	}, [isLoaded, coordinates.currentPosition, destination, isNavigating]);

	useEffect(() => {
		// Effect to clear directions when navigation is stopped
		if (!isNavigating) {
			setDirectionsResult(null); // Clear directions result when navigation stops
			forceRerender(); // Force rerender to reset the map state
		}
	}, [isNavigating]);

	return isLoaded ? (
		<div className="container-fluid p-0" key={mapKey}>
			<div
				className="d-flex flex-column align-items-center justify-content-center"
				style={{ position: 'relative' }}
			>
				<div className="p-2 w-100">
					<GoogleMap
						mapContainerClassName={`${styles.container} w-100`}
						center={center}
						zoom={zoom}
						options={mapOptions}
						onLoad={(map) => {
							setGoogleMapInstance(map);
							window.google.maps.event.addListener(map, 'zoom_changed', () => {
								setZoom(map.getZoom());
							});
						}}
					>
						{coordinates.currentPosition && (
							<Marker
								position={coordinates.currentPosition}
								icon={customIcon(isLoaded, icon)}
							/>
						)}
						{directionsResult && isNavigating && (
							<DirectionsRenderer
								directions={directionsResult}
								options={{
									polylineOptions: {
										strokeColor: '#ff2527',
										strokeOpacity: 0.8,
										strokeWeight: 5,
									},
									preserveViewport: true,
								}}
							/>
						)}
					</GoogleMap>
				</div>
				<div className="position-absolute" style={{ bottom: 130, right: 13 }}>
					<CentreControl
						map={googleMapInstance}
						currentPosition={coordinates.currentPosition}
					/>
				</div>
				<div className="position-absolute" style={{ bottom: 20, right: 20 }}>
					<ShowAlertModal updateDestination={updateDestination} />
				</div>
				<div className="position-absolute" style={{ top: 30, right: 20 }}>
					<CallControl />
				</div>
				<div className="position-absolute" style={{ top: 100, right: 10 }}>
					{isNavigating && (
						<ArrivalControl
							stopNavigation={stopNavigation}
							isNavigating={isNavigating}
						/>
					)}
				</div>
				<div className="position-absolute" style={{ top: 180, right: 10 }}>
					{isNavigating && <InfoButton />}
				</div>
			</div>
		</div>
	) : null;
}

Dashboard.propTypes = {
	destination: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			lat: PropTypes.number.isRequired,
			lng: PropTypes.number.isRequired,
		}),
	]),
	updateDestination: PropTypes.func.isRequired,
	stopNavigation: PropTypes.func.isRequired,
	isNavigating: PropTypes.bool.isRequired,
};

export default Dashboard;
