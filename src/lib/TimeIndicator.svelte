<script>
	export let badgeType;
</script>

{#if badgeType === 'warning'}
	<span class="indicator-item badge badge-warning" />
{:else if badgeType === 'error'}
	<span class="indicator-item badge badge-error" />
{/if}
