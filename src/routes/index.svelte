<script type="ts">
	import { getNextTrip } from '$lib/api';
	import Departures from '$lib/Departures.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Header from '$lib/Header.svelte';
	import RefreshButton from '$lib/RefreshButton.svelte';

	let myTrips;

	loadMyTrips();

	function loadMyTrips(): void {
		myTrips = getNextTrip();
	}
</script>

<Header />
<RefreshButton on:click={loadMyTrips} />

<div id="trips">
	{#await myTrips}
		<Spinner />
	{:then myTrips}
		<Departures {myTrips} />
	{/await}
</div>
