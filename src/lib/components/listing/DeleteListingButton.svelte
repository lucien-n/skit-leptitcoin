<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { successToast, warnToast } from '$lib/helper';
	import { confirmModal } from '$lib/modals';
	import { createEventDispatcher } from 'svelte';

	export let listing_uid: string;

	const dispatch = createEventDispatcher();

	const deleteListing = async () => {
		dispatch('click');

		const confirm = await confirmModal({
			body: `Delete listing <u>${listing_uid}</u>?<br>This action is <strong>irreversible</strong>`
		});
		if (!confirm) return;

		const { status } = await fetch(`/api/listing/delete/${listing_uid}`);

		if (status == 200) {
			successToast(`Listing <u>${listing_uid}</u> deleted`);
			dispatch('success');
		} else {
			warnToast(`Error while deleting listing <u>${listing_uid}</u>`);
		}
	};
</script>

<button on:click={deleteListing} class="btn variant-ghost-error m-1 p-1" aria-label="delete">
	<Icon name="trash" />
</button>
