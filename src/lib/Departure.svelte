<script type="ts">
	import { slide } from 'svelte/transition';
	import { differenceInMinutes } from 'date-fns';
	import TimeIndicator from './TimeIndicator.svelte';

	export let lineNumber: string;
	export let destination: string;
	export let departureTime: Date;
	export let index: number;

	let timeRightNow = new Date();

	const timeUpdateInterval = setInterval(() => {
		timeRightNow = new Date();
	}, 10000);

	function formatDate(date: Date): string {
		return `${addLeftPadding(date.getHours())}:${addLeftPadding(date.getMinutes())}`;
	}

	function addLeftPadding(text: string | number): string {
		if (`${text}`.length < 2) {
			return `0${`${text}`}`;
		}

		return `${text}`;
	}

	function getTimeIndicator(date: Date): string {
		let timeIndicator = '';

		if (differenceInMinutes(date, timeRightNow) <= 5) {
			timeIndicator = 'error';
		} else if (differenceInMinutes(date, timeRightNow) <= 15) {
			timeIndicator = 'warning';
		}

		return timeIndicator;
	}

	$: badgeType = getTimeIndicator(departureTime);
</script>

<li class="indicator flex w-full" in:slide={{ delay: index * 80 }}>
	<TimeIndicator {badgeType} />

	<div class="grid grid-cols-4 bg-secondary text-secondary-content p-4 rounded-md mb-4 w-full">
		<p class="col-span-1">
			{lineNumber}
		</p>
		<p class="col-span-2">
			{destination}
		</p>
		<p class="col-span-1 text-right">
			{formatDate(departureTime)}
		</p>
	</div>
</li>
