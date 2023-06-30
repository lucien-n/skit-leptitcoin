<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CheckSvg from '$lib/components/svgs/CheckSvg.svelte';

	export let listing_uid: string;
	export let index: number = 0;

	const dispatch = createEventDispatcher();

	const validateListing = () => {
		fetch(`/admin/validate/${listing_uid}`);
		dispatch('click');
	};
</script>

<button
	on:click={validateListing}
	class="variant-glass-success btn p-2"
	aria-label="validate"
	tabindex={index}
>
	<CheckSvg />
</button>
