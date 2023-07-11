<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/widgets/Icon.svelte';

	export let listing_uid: string;

	const dispatch = createEventDispatcher();

	const validateListing = () => {
		fetch(`/admin/validate/${listing_uid}`);
		dispatch('click');
	};
</script>

<button on:click={validateListing} class="btn variant-glass-success p-2" aria-label="validate">
	<Icon name="check" />
</button>
