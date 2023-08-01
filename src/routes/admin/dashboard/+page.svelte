<script lang="ts">
	import AdminListingTable from '$comp/admin/AdminListingTable.svelte';
	import AdminProfileTable from '$comp/admin/AdminProfileTable.svelte';
	import { TITLE } from '$lib/helper';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	export let data: { listings: SupaListing[] | null; profiles: SupaProfile[] | null };

	let { listings, profiles } = data;
	$: ({ listings, profiles } = data);

	let tabSet: 'listings' | 'profiles' = 'listings';
</script>

<svelte:head>
	<title>{TITLE} Admin Dashboard</title>
	<meta name="description" content="Monitor and manage profiles and listings." />
</svelte:head>

<section
	id="admin-dashboard"
	class="m-2 mx-auto flex h-full w-full flex-col gap-2 xl:w-[90%] 2xl:w-[70%]"
>
	<TabGroup flex="mx-auto">
		<Tab bind:group={tabSet} value="listings" name="listings-tab">
			<svelte:fragment slot="lead">📃</svelte:fragment>
			<span>Listings</span>
		</Tab>
		<Tab bind:group={tabSet} value="profiles" name="profiles-tab">
			<svelte:fragment slot="lead">😶</svelte:fragment>
			<span>Profiles</span>
		</Tab>
		<svelte:fragment slot="panel">
			{#if tabSet === 'listings' && listings}
				<AdminListingTable {listings} />
			{:else if tabSet === 'profiles'}
				<AdminProfileTable {profiles} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</section>
