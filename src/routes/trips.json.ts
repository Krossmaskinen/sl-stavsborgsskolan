import { SL_REAL_TIME_DEPARTURES_API_KEY, SL_REAL_TIME_DEPARTURES_API_URL } from '$lib/env';

const busStopIds = [
	{
		name: 'Stavsborgsskolan',
		id: '4601'
	}
];
const timeWindowInMinutes = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getNextTrip(): Promise<any> {
	const url = `${SL_REAL_TIME_DEPARTURES_API_URL}?key=${SL_REAL_TIME_DEPARTURES_API_KEY}&siteid=${busStopIds[0].id}&timewindow=${timeWindowInMinutes}`;

	console.log(url);

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
	const response = await getNextTrip();
	const isRequestSuccessful = response.StatusCode === 0;

	if (!isRequestSuccessful) {
		return {
			body: {
				error: { statusCode: response.StatusCode, message: response.Message }
			}
		};
	}

	const buses = response.ResponseData?.Buses;

	return { body: { buses } };
}
