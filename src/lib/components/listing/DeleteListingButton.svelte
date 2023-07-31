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

<button on:click={deleteListing} class="btn variant-ghost-error m-1 p-1" aria-label="delete">
	<Icon name="trash" />
</button>
