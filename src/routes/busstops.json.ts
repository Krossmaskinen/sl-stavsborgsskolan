import { SL_SITE_API_KEY, SL_SITE_API_URL } from '$lib/env';

async function getBusstopsFromQuery(queryString) {
	const apiKey = SL_SITE_API_KEY;
	const url = `${SL_SITE_API_URL}?key=${apiKey}&searchstring=${queryString}&stationsonly=true&maxresults=10`;
	const result = await fetch(url).then((res) => res.json());

	return result;
}

export async function get(event) {
	const queryString = event.url.searchParams.get('queryString');
	const result = await getBusstopsFromQuery(queryString);

	if (result.StatusCode === 0) {
		return { body: { busstops: result.ResponseData } };
	}

	return { body: { error: { statusCode: result.StatusCode, message: result.Message } } };
}
