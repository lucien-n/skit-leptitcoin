<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let listing_uid: string;

	const dispatch = createEventDispatcher();

	const deleteListing = () => {
		dispatch('click');
		fetch(`/api/delete/${listing_uid}`).then((success) => {
			dispatch('success', { success });
		});
	};
</script>

<button on:click={deleteListing} class="btn variant-glass-error p-2" aria-label="delete">
	<Icon name="trash" />
</button>
