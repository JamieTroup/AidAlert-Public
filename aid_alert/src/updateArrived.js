const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_8;

/**
 * Marks an event as 'arrived' by updating its status on the server.
 * Sends a POST request to the API Gateway with the event ID and the new status.
 *
 * @param {string} event_id - The unique identifier of the event to be updated.
 * @returns {Promise<Object>} - The server response data or undefined in case of failure.
 */
const updateArrived = async (event_id) => {
	if (!event_id) {
		console.error('No event_id found. Cannot update has_arrived status.');
		return;
	}

	try {
		console.log(
			'Sending update request:',
			JSON.stringify({ event_id, has_arrived: true })
		);
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_id,
				has_arrived: true,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const responseData = await response.json();
		console.log(
			'has_arrived status successfully updated to AWS:',
			responseData
		);
		return responseData;
	} catch (error) {
		console.error('Failed to update has_arrived to AWS:', error);
	}
};

export default updateArrived;
