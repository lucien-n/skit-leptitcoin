<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import SearchModal from './SearchModal.svelte';

	const searchModalComponent: ModalComponent = {
		ref: SearchModal
	};

	const searchModalSettings: ModalSettings = {
		type: 'component',
		component: searchModalComponent
	};

	const openSearchModal = () => {
		modalStore.trigger(searchModalSettings);
	};
</script>

<section id="search" class="mx-auto flex w-full lg:w-4/5">
	<div class="input-group input-group-divider">
		<section class="flex">
			<input type="text" class="w-full" placeholder="Search" />
			<button class="input-group-shim btn rounded-l-none px-3" on:click={openSearchModal}>
				<Icon name="more_horizontal" />
			</button>
		</section>
	</div>
</section>
