/**
 * Default center position for the Google Map.
 * This is the initial geographical center of the map upon loading.
 */
export const defaultCenter = { lat: 56.457677, lng: -2.980075 };

/**
 * Configuration options for loading the Google Maps JavaScript API.
 * Includes the API key, a unique ID for the script tag, and the version of the API.
 */
export const loaderOptions = {
	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // API key for Google Maps, stored in environment variables.
	id: 'google-map-script', // Unique ID for the script tag to prevent re-loading.
	version: 'weekly', // Specifies which version of the API to use. Using the weekly version because it is the most up-to-date.
};

/**
 * Configuration options for the Google Map component.
 * Includes the options to disable default UI controls and enable zoom control.
 */
export const mapOptions = {
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
};

/* eslint-disable indent */
export const customIcon = (isLoaded, icon) =>
	isLoaded
		? {
				url: icon,
				scaledSize: new window.google.maps.Size(30, 30),
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(10, 10),
			}
		: {};
/* eslint-enable indent */
