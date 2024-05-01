//NOT IN USE
const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_GATEWAY_ENDPOINT_5;

async function getResponderName(sub) {
	try {
		console.log('Sending request for sub:', sub);
		const response = await fetch(API_GATEWAY_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sub }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const responseData = await response.json();
		console.log('Response data received from API:', responseData);

		return responseData;
	} catch (error) {
		console.error('Failed to send request to API:', error);
	}
}

export default getResponderName;
