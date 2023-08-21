<script lang="ts">
	import Search from '$comp/navigation/Search.svelte';
	import Icon from '$comp/widgets/Icon.svelte';
	import Table from '$comp/widgets/Table.svelte';
	import { successToast, warnToast } from '$lib/helper';
	import { confirmModal } from '$lib/modals';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let profiles: SupaProfile[] | null;

	type Search = {
		profile: string;
		rating_min: number;
		rating_max: number;
		showWhat: 'all' | 'restricted' | 'non-restricted';
	};

	let search: Writable<Search> = writable({
		showWhat: 'all'
	} as Search);

	$: filtered_profiles = profiles;
	let refresh_table = 0;

	let columns = ['picture', 'username', 'rating', 'created_at'];

	search.subscribe(({ showWhat, profile, rating_min, rating_max }: Search) => {
		const profile_regex = new RegExp(`${profile || ''}`, 'i');

		if (profiles)
			filtered_profiles = profiles.filter((profile) => {
				let is_in_rating_range = true;

				if (rating_min && profile.rating < rating_min) is_in_rating_range = false;
				if (rating_max && profile.rating > rating_max) is_in_rating_range = false;

				return (
					profile.username.match(profile_regex) &&
					is_in_rating_range &&
					(showWhat === 'all' ? true : (showWhat === 'restricted') === profile.restricted)
				);
			});
		refresh_table++;
	});

	async function disableProfile(profile: SupaProfile) {
		const confirm = await confirmModal({
			body: `Disable user <u>${profile.username}</u>?`
		});
		if (!confirm) return;

		const { status } = await fetch(`/api/profile/disable/${profile.uid}`);

		if (status === 200) {
			successToast(`User <u>${profile.username}</u> disabled`);
			profile.restricted = true;
		} else {
			warnToast(`Error while disabling user <u>${profile.username}</u>`);
		}
	}

	async function deleteProfile(profile: SupaProfile) {
		const confirm = await confirmModal({
			body: `Delete user <u>${profile.username}</u>?<br>This action is <strong>irreversible</strong>`
		});
		if (!confirm) return;

		const { status } = await fetch(`/api/profile/delete/${profile.uid}`);

		if (status === 200) {
			successToast(`User <u>${profile.username}</u> deleted`);
		} else {
			warnToast(`Error while deleting user <u>${profile.username}</u>`);
		}
	}

	async function enableProfile(profile: SupaProfile) {
		const confirm = await confirmModal({ body: `Enable user <u>${profile.username}</u>?` });
		if (!confirm) return;

		const { status } = await fetch(`/api/profile/enable/${profile.uid}`);

		if (status === 200) {
			successToast(`User <u>${profile.username}</u> enabled`);
			profile.restricted = false;
		} else {
			warnToast(`Error while enabling user <u>${profile.username}</u>`);
		}
	}

	const getProfileRow = () => getContext('RowContext') as SupaProfile;
</script>

<section class="flex flex-col gap-4">
	<section class="flex items-center gap-3">
		<RadioGroup>
			<RadioItem bind:group={$search.showWhat} name="showWhat" value="all">All</RadioItem>
			<RadioItem bind:group={$search.showWhat} name="showWhat" value="restricted"
				>Restricted</RadioItem
			>
			<RadioItem bind:group={$search.showWhat} name="showWhat" value="non-restricted"
				>Non Restricted</RadioItem
			>
		</RadioGroup>
		<input
			type="text"
			id="filterProfile"
			placeholder="Profile"
			class="input w-fit"
			bind:value={$search.profile}
		/>
		<input
			type="number"
			id="filterRatingMin"
			placeholder="Rating Min"
			class="input w-fit"
			bind:value={$search.rating_min}
		/>
		<input
			type="number"
			id="filterRatingMax"
			placeholder="Rating Max"
			class="input w-fit"
			bind:value={$search.rating_max}
		/>
	</section>
	{#if filtered_profiles}
		<Table elements={filtered_profiles} {columns} bind:refresh={refresh_table}>
			<svelte:fragment slot="actions">
				<button
					on:click={() => deleteProfile(getProfileRow())}
					class="btn variant-ghost-error m-1 aspect-square p-1"
				>
					<Icon name="trash" />
				</button>
				{#if getProfileRow().restricted}
					<button
						on:click={() => enableProfile(getProfileRow())}
						class="btn variant-ghost-success m-1 aspect-square p-1"
					>
						<Icon name="check" />
					</button>
				{:else}
					<button
						on:click={() => disableProfile(getProfileRow())}
						class="btn variant-ghost-secondary m-1 aspect-square p-1"
					>
						<Icon name="slash" />
					</button>
				{/if}
			</svelte:fragment>
		</Table>
	{/if}
</section>
