<script lang="ts">
	import DeleteListingButton from '$comp/listing/DeleteListingButton.svelte';
	import EditListingButton from '$comp/listing/EditListingButton.svelte';
	import Table from '$comp/widgets/Table.svelte';
	import { profileStore } from '$lib/store';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import ValidateListingButton from '../listing/ValidateListingButton.svelte';
	import { confirmModal } from '$lib/modals';
	import { successToast, warnToast } from '$lib/helper';
	import Search from '$comp/navigation/Search.svelte';

	export let listings: SupaListing[] | null;

	$: filtered_listings = listings;
	let refresh_table = 0;

	type Search = {
		author: string;
		title: string;
		price_min: number;
		price_max: number;
		showWhat: 'all' | 'valids' | 'non-valids';
	};

	let search: Writable<Search> = writable({ showWhat: 'all' } as Search);

	let columns = ['category', 'title', 'price', 'condition', 'author_username', 'created_at'];

	search.subscribe(({ showWhat, author, title, price_min, price_max }: Search) => {
		const author_regex = new RegExp(`${author || ''}`, 'i');
		const title_regex = new RegExp(`${title || ''}`, 'i');

		if (listings)
			filtered_listings = listings.filter((listing) => {
				let is_in_price_range = true;

				if (price_min && listing.price <= price_min) is_in_price_range = false;
				if (price_max && listing.price >= price_max) is_in_price_range = false;

				return (
					listing.author_username?.match(author_regex) &&
					listing.title?.match(title_regex) &&
					is_in_price_range &&
					(showWhat === 'all' ? true : (showWhat === 'valids') === listing.is_validated)
				);
			});
		refresh_table++;
	});

	const listingRow = () => getContext('RowContext') as SupaListing;
</script>

<section class="flex flex-col gap-4">
	<section class="flex items-center gap-3">
		<RadioGroup>
			<RadioItem bind:group={$search.showWhat} name="showWhat" value="all">All</RadioItem>
			<RadioItem bind:group={$search.showWhat} name="showWhat" value="valids">Valids</RadioItem>
			<RadioItem bind:group={$search.showWhat} name="showWhat" value="non-valids"
				>Non Valids</RadioItem
			>
		</RadioGroup>
		<input
			type="text"
			id="filterAuthorUsername"
			placeholder="Author"
			class="input w-fit"
			bind:value={$search.author}
		/>
		<input
			type="text"
			id="filterTitle"
			placeholder="Title"
			class="input w-fit"
			bind:value={$search.title}
		/>
		<input
			type="number"
			id="filterPriceMin"
			placeholder="Price Min"
			class="input w-fit"
			bind:value={$search.price_min}
		/>
		<input
			type="number"
			id="filterPriceMax"
			placeholder="Price Max"
			class="input w-fit"
			bind:value={$search.price_max}
		/>
	</section>
	{#if filtered_listings}
		<Table elements={filtered_listings} {columns} bind:refresh={refresh_table}>
			<svelte:fragment slot="actions">
				<DeleteListingButton listing_uid={listingRow().uid} />
				<EditListingButton listing_uid={listingRow().uid} />
				{#if !listingRow().is_validated && $profileStore && $profileStore?.role >= 8}
					{@const listing = listingRow()}
					<ValidateListingButton
						listing_uid={listingRow().uid}
						on:success={({ detail: { success } }) => {
							if (listings && success) listings[listings?.indexOf(listing)].is_validated = true;
							refresh_table++;
						}}
					/>
				{/if}
			</svelte:fragment>
		</Table>
	{/if}
</section>
