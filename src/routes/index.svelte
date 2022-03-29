<script type="ts">
	import { getNextTrip } from '$lib/api';
	import Departures from '$lib/Departures.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Header from '$lib/Header.svelte';
	import RefreshButton from '$lib/RefreshButton.svelte';
	import ConfigButton from '$lib/ConfigButton.svelte';
	import { goto } from '$app/navigation';

	let myTrips;

	loadMyTrips();

	function loadMyTrips(): void {
		myTrips = getNextTrip();
	}
</script>

<Header />
<RefreshButton on:click={loadMyTrips} />
<ConfigButton
	on:click={() => {
		goto('/Configuration');
	}}
/>

<div id="trips">
	{#await myTrips}
		<Spinner />
	{:then myTrips}
		<Departures {myTrips} />
	{/await}
</div>
