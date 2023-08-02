<script lang="ts">
	import DeleteListingButton from '$comp/listing/DeleteListingButton.svelte';
	import EditListingButton from '$comp/listing/EditListingButton.svelte';
	import Table from '$comp/widgets/Table.svelte';
	import { profileStore } from '$lib/store';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import ValidateListingButton from '../listing/ValidateListingButton.svelte';

	export let listings: SupaListing[] | null;

	$: filtered_listings = listings;
	let refresh_table = 0;

	type Search = {
		search: string;
		author: string;
		showWhat: 'all' | 'valids' | 'non-valids';
	};

	let search: Writable<Search> = writable({
		search: '',
		author: '',
		showWhat: 'all'
	});

	let columns = ['category', 'title', 'price', 'condition', 'author_username', 'created_at'];

	search.subscribe(({ search, showWhat, author }: Search) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');
		const author_regex = new RegExp(`${author || ''}`, 'i');

		if (listings)
			filtered_listings = listings.filter((listing) => {
				return (
					listing.title.match(search_regex) &&
					listing.author_username?.match(author_regex) &&
					(showWhat === 'all' ? true : (showWhat === 'valids') === listing.is_validated)
				);
			});
	});

	const listingRow = () => getContext('RowContext') as SupaListing;
</script>

<section class="flex flex-col gap-4">
	<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
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
