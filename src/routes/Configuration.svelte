<script type="ts">
	import { goto } from '$app/navigation';
	import { getBusesFromBusstop } from '$lib/api';

	import BusButton from '$lib/BusButton.svelte';
	import type { Busstop } from '$lib/Constants';
	import SearchButton from '$lib/SearchButton.svelte';

	let departureSearchString = '';
	let arrivalSearchString = '';
	let departureBusstops;
	let selectedDepartureBusstop: Busstop;
	let destinationBusstops;
	let selectedDestination;

	async function getDepartureBusstops() {
		if (departureSearchString) {
			departureBusstops = await getStationsFromQuery(departureSearchString);
		}
	}

	async function getStationsFromQuery(searchString) {
		let busstops;
		const result = await fetch(`/busstops.json?queryString=${searchString}`).then((res) =>
			res.json()
		);

		if (!result.error) {
			busstops = result.busstops;
		}

		return busstops;
	}

	function selectDepartureBusstop(busstop) {
		selectedDepartureBusstop = busstop;
		clearSearchResults();
		clearSearchFields();
		updateDestinations();
	}

	function selectDestinationBusstop(busstop) {
		selectedDestination = busstop;
		clearSearchResults();
		clearSearchFields();
	}

	async function updateDestinations() {
		const buses = await getBusesFromBusstop(selectedDepartureBusstop.SiteId);

		destinationBusstops = buses;
	}

	function clearSearchResults() {
		departureBusstops = undefined;
		destinationBusstops = undefined;
	}

	function clearSearchFields() {
		departureSearchString = '';
		arrivalSearchString = '';
	}
</script>

<div>
	<h1 class="my-8">Configuration</h1>

	<BusButton on:click={() => goto('/')} />

	<form on:submit|preventDefault={getDepartureBusstops}>
		<div class="form-control">
			<label for="from-stop-query" class="label">Från</label>
			<div class="input-group">
				<input
					type="text"
					class="input input-bordered input-primary w-full"
					id="from-stop-query"
					placeholder="Välj hållplats från..."
					bind:value={departureSearchString}
				/>
				<SearchButton />
			</div>
		</div>
	</form>

	{#if selectedDepartureBusstop && !departureBusstops}
		<div class="bg-secondary text-secondary-content p-4 rounded-md my-4 w-full">
			{selectedDepartureBusstop.Name} - {selectedDepartureBusstop.SiteId}
		</div>
	{/if}

	<div>
		{#if departureBusstops}
			<ul class="menu bg-accent w-full">
				{#each departureBusstops as busstop, i ({})}
					<li>
						<button on:click={() => selectDepartureBusstop(busstop)}
							>{busstop.Name} - {busstop.SiteId}</button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="divider" />

	{#if selectedDestination && !destinationBusstops}
		<div class="bg-secondary text-secondary-content p-4 rounded-md my-4 w-full">
			{selectedDestination.lineNumber} - {selectedDestination.destination}
		</div>
	{/if}

	<div>
		{#if destinationBusstops}
			<ul class="menu bg-accent w-full">
				{#each destinationBusstops as busstop, i ({})}
					<li>
						<button on:click={() => selectDestinationBusstop(busstop)}
							>{busstop.lineNumber} - {busstop.destination}</button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
