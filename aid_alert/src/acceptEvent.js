const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_7;

/**
 * Asynchronously accepts an event by updating its 'is_accepted' status in the API.
 * Logs the operation's attempt and results, and handles potential errors.
 *
 * @param {string} event_id - The unique identifier of the event to be accepted.
 * @returns {Object} The response data from the API if successful; otherwise, returns nothing.
 */
const acceptEvent = async (event_id) => {
	if (!event_id) {
		console.error('No user sub found. Cannot update is_accepted status.');
		return;
	}

	try {
		console.log('Sending:', JSON.stringify({ event_id, is_accepted: true }));
		// Sends a POST request to update the event's acceptance status
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_id,
				is_accepted: true,
			}),
		});

		if (!response.ok) {
			// Throws an error if the response from the server isn't OK
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parses and logs the response data upon successful update
		const responseData = await response.json();
		console.log(
			'is_accepted',
			true,
			'successfully updated to AWS:',
			responseData
		);
		return responseData;
	} catch (error) {
		// Logs errors if the attempt to update the acceptance status fails
		console.error('Failed to update is_accepted to AWS:', error);
	}
};

export default acceptEvent;
