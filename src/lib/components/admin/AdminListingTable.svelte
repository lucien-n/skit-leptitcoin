<script lang="ts">
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import { profileStore } from '$lib/store';
	import { filter, SlideToggle } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import ValidateListingButton from '../listing/ValidateListingButton.svelte';
	import { formatDate, LISTING_CONDITIONS } from '$lib/helper';
	import DeleteListingButton from '$comp/listing/DeleteListingButton.svelte';
	import EditListingButton from '$comp/listing/EditListingButton.svelte';
	import Table from './Table.svelte';
	import { getContext } from 'svelte';

	export let listings: SupaListing[] | null;

	$: filtered_listings = listings;

	type Search = {
		search: string;
		toggleValids: boolean;
		author: string;
	};

	let search: Writable<Search> = writable({
		search: '',
		toggleValids: false,
		author: ''
	});

	let columns = ['category', 'title', 'price', 'condition', 'author_username', 'created_at'];

	search.subscribe(({ search, toggleValids, author }: Search) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');
		const author_regex = new RegExp(`${author || ''}`, 'i');

		if (listings)
			filtered_listings = listings.filter((listing) => {
				return (
					listing.title.match(search_regex) &&
					listing.author_username?.match(author_regex) &&
					toggleValids == listing.is_validated
				);
			});
	});

	const listingRow = () => getContext('RowContext') as SupaListing;
</script>

<section class="flex flex-col gap-4">
	<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
	<section class="flex items-center gap-3">
		<SlideToggle bind:checked={$search.toggleValids} name="toggleShowValids"
			>Toggle Show Valids</SlideToggle
		>
		<input
			type="text"
			id="filterAuthorUsername"
			placeholder="Author"
			class="input w-fit"
			bind:value={$search.author}
		/>
	</section>
	{#if filtered_listings}
		<Table elements={filtered_listings} {columns}>
			<svelte:fragment slot="actions">
				<DeleteListingButton listing_uid={listingRow().uid} />
				<EditListingButton listing_uid={listingRow().uid} />
				{#if !listingRow().is_validated && $profileStore && $profileStore?.role >= 8}
					<ValidateListingButton
						listing_uid={listingRow().uid}
						on:success={() => (listingRow().is_validated = true)}
					/>
				{/if}
			</svelte:fragment>
		</Table>
	{/if}
</section>
