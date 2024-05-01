const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_4;

/**
 * Deletes an event by ID via an API request.
 *
 * @param {string} eventId - ID of the event to delete.
 * @returns {Object|null} Response data on success, or null on failure.
 */
async function deleteEvent(eventId) {
	try {
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ event_id: eventId }),
		});

		if (!response.ok) throw new Error('Failed to delete event');

		return await response.json();
	} catch (error) {
		console.error('Failed to delete event:', error);
		return null;
	}
}

export default deleteEvent;
