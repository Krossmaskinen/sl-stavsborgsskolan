import type { ApiBus, Bus } from './Constants';

const allowedBuses = ['801', '401'];
const allowedDestinations = ['Gullmarsplan', 'Slussen'];

export async function getNextTrip(): Promise<Bus[]> {
	const url = 'http://localhost:8000/next-trips';
	const result = await fetch(url, { mode: 'cors' }).then((res) => res.json());
	const departures = result.ResponseData.Buses.filter(getOnlyAllowedBuses).filter(
		getOnlyAllowedDestinations
	);
	const buses = departures.map(mapApiBusToBus);

	return buses;
}

function getOnlyAllowedBuses(bus: ApiBus) {
	return allowedBuses.includes(bus.LineNumber);
}

function getOnlyAllowedDestinations(bus: ApiBus) {
	return allowedDestinations.includes(bus.Destination);
}

function mapApiBusToBus(apiBus: ApiBus): Bus {
	return {
		departureTime: new Date(apiBus.ExpectedDateTime),
		lineNumber: apiBus.LineNumber,
		destination: apiBus.Destination
	};
}
