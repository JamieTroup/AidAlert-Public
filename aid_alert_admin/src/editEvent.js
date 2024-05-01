const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_3;

/**
 * Updates an event using a PUT request.
 * @param {Object} event - Event data to update.
 */
async function editEvent(event) {
	try {
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(event),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		console.log('Event updated:', await response.json());
	} catch (error) {
		console.error('Error updating event:', error);
	}
}

export default editEvent;
