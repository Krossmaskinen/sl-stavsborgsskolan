<script type="ts">
	import SearchButton from '$lib/SearchButton.svelte';

	let departureSearchString = '';
	let arrivalSearchString = '';
	let departureBusstops;
	let arrivalBusstops;
	let selectedDepartureBusstop;
	let selectedArrivalBusstop;

	async function getDepartureBusstops() {
		if (departureSearchString) {
			departureBusstops = await getStationsFromQuery(departureSearchString);
		}
	}

	async function getArrivalBusstops() {
		if (arrivalSearchString) {
			arrivalBusstops = await getStationsFromQuery(arrivalSearchString);
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
	}

	function selectArrivalBusstop(busstop) {
		selectedArrivalBusstop = busstop;
		clearSearchResults();
		clearSearchFields();
	}

	function clearSearchResults() {
		departureBusstops = undefined;
		arrivalBusstops = undefined;
	}

	function clearSearchFields() {
		departureSearchString = '';
		arrivalSearchString = '';
	}
</script>

<div>
	<h1 class="my-8">Configuration</h1>

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

	<form on:submit|preventDefault={getArrivalBusstops}>
		<div class="form-control">
			<label for="to-stop-query" class="label">Till</label>
			<div class="input-group">
				<input
					type="text"
					class="input input-bordered input-primary w-full"
					id="to-stop-query"
					placeholder="Välj hållplats till..."
					bind:value={arrivalSearchString}
				/>
				<SearchButton />
			</div>
		</div>
	</form>

	{#if selectedArrivalBusstop && !arrivalBusstops}
		<div class="bg-secondary text-secondary-content p-4 rounded-md my-4 w-full">
			{selectedArrivalBusstop.Name} - {selectedArrivalBusstop.SiteId}
		</div>
	{/if}

	<div>
		{#if arrivalBusstops}
			<ul class="menu bg-accent w-full">
				{#each arrivalBusstops as busstop, i ({})}
					<li>
						<button on:click={() => selectArrivalBusstop(busstop)}
							>{busstop.Name} - {busstop.SiteId}</button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
