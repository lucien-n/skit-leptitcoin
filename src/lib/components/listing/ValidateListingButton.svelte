<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let listing_uid: string;

	const dispatch = createEventDispatcher();

	const validateListing = async () => {
		dispatch('click');
		const { status, statusText } = await fetch(`/api/listing/validate/${listing_uid}`);
		const success = status == 200;
		dispatch('success', { success });
	};
</script>

<button
	out:fly={{ x: 10, duration: 200 }}
	on:click={validateListing}
	class="btn variant-ghost-success m-1 aspect-square p-1"
	aria-label="validate"
>
	<Icon name="check" />
</button>
