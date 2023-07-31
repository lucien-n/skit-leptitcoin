<script lang="ts">
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import { profileStore } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import ValidateListingButton from '../listing/ValidateListingButton.svelte';
	import { formatDate, LISTING_CONDITIONS } from '$lib/helper';
	import DeleteListingButton from '$comp/listing/DeleteListingButton.svelte';
	import EditListingButton from '$comp/listing/EditListingButton.svelte';

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

	let columns = ['Category', 'Title', 'Price', 'Condition', 'Author', 'Created', 'Actions'];

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
	<table id="listings" class="w-full overflow-y-auto">
		<thead class="sticky top-0 bg-surface-900">
			<tr>
				{#each columns as col}
					<th class="p-3">{col}</th>
				{/each}
			</tr>
		</thead>
		{#if filtered_listings}
			<tbody>
				{#each filtered_listings as listing}
					<tr class="even:bg-surface-700">
						<td class="text-center">{listing.category}</td>
						<td class="text-center">{listing.title}</td>
						<td class="text-center">{listing.price}</td>
						<td class="text-center">{LISTING_CONDITIONS[listing.condition]}</td>
						<td class="text-center"
							><a href="/u/{listing.author_uid}">{listing.author_username}</a></td
						>
						<td class="text-center">{formatDate(new Date(listing.created_at || 0).getTime())}</td>
						<td class="text-center">
							<DeleteListingButton listing_uid={listing.uid} />
							<EditListingButton listing_uid={listing.uid} />
							{#if !listing.is_validated && $profileStore && $profileStore?.role >= 8}
								<ValidateListingButton
									listing_uid={listing.uid}
									on:success={() => (listing.is_validated = true)}
								/>
							{/if}
						</td>
					</tr>
					<!-- <div class="flex w-full gap-2 transition-all duration-200 ease-in-out">
					<ListingRow {listing} />
					{#if !listing.is_validated && $profileStore && $profileStore?.role >= 8}
					<ValidateListingButton
					listing_uid={listing.uid}
					/>
					{/if}
				</div> -->
				{/each}
			</tbody>
		{/if}
	</table>
</section>
