<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/widgets/Icon.svelte';

	export let listing_uid: string;

	const dispatch = createEventDispatcher();

	const deleteListing = () => {
		fetch(`/d/${listing_uid}`);
		dispatch('click');
	};
</script>

<button on:click={deleteListing} class="btn variant-glass-error p-2" aria-label="delete">
	<Icon name="trash" />
</button>
