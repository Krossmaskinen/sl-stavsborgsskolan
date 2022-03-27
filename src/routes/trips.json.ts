import { API_KEY, API_URL } from '$lib/env';

const busStopIds = [
	{
		name: 'Stavsborgsskolan',
		id: '4601'
	}
];
const timeWindowInMinutes = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getNextTrip(): Promise<any> {
	const url = `${API_URL}?key=${API_KEY}&siteid=${busStopIds[0].id}&timewindow=${timeWindowInMinutes}`;

	const result = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
		.then((res) => res.json())
		.catch((e) => {
			console.error(e);
		});

	return result;
}

export async function get() {
	const buses = await getNextTrip().then((res) => res.ResponseData.Buses);

	return { body: { buses } };
}
