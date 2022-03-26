<script type="ts">
	import Departure from './Departure.svelte';
	import DeparturesHeading from './DeparturesHeading.svelte';
	import type { Bus } from './Constants';

	export let myTrips: Bus[];
</script>

<ul>
	<DeparturesHeading />
	{#each myTrips as trip, i ({})}
		<Departure {...trip} index={i} />
	{/each}
</ul>
