const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_2;

/**
 * Asynchronously uploads an event to a specified API endpoint using a POST request.
 * This function handles the sending of event data, logs the process, and manages errors.
 *
 * @param {Object} event - The event data to be uploaded.
 */
async function uploadEvent(event) {
	try {
		console.log('To upload', event); // Log the event data being uploaded
		// Initiate a POST request to the specified API endpoint with the event data
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(event),
		});

		if (!response.ok) {
			// If the response is not OK, throw an error with the response status
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		// Log the successful response from the API
		console.log('Event data successfully sent to API:', await response.json());
	} catch (error) {
		// Catch and log any errors that occur during the fetch operation
		console.error('Failed to send event data to API:', error);
	}
}

export default uploadEvent;
