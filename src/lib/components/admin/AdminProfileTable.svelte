<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { formatDate, successToast, warnToast } from '$lib/helper';
	import { confirmModal } from '$lib/modals';
	import { Avatar, RadioGroup, RadioItem, SlideToggle, filter } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import Table from './Table.svelte';
	import { getContext } from 'svelte';

	export let profiles: SupaProfile[] | null;

	type Search = {
		search: string;
		profile: string;
		showWhat: 'all' | 'restricted' | 'non-restricted';
	};

	let search: Writable<Search> = writable({
		search: '',
		profile: '',
		showWhat: 'all'
	});

	$: filtered_profiles = profiles;

	let columns = ['picture', 'username', 'rating', 'created_at'];

	search.subscribe(({ search, showWhat, profile }: Search) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');
		const profile_regex = new RegExp(`${profile || ''}`, 'i');

		if (profiles)
			filtered_profiles = profiles.filter(
				(profile) =>
					profile.username.match(search_regex) &&
					(showWhat === 'all' ? true : (showWhat === 'restricted') === profile.restricted)
			);
	});

	async function disableProfile(profile: SupaProfile) {
		const confirm = await confirmModal({
			body: `Disable user <u>${profile.username}</u>?`
		});
		if (!confirm) return;

		const { status } = await fetch(`/api/user/disable/${profile.uid}`);

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

		const { status } = await fetch(`/api/user/delete/${profile.uid}`);

		if (status === 200) {
			successToast(`User <u>${profile.username}</u> deleted`);
		} else {
			warnToast(`Error while deleting user <u>${profile.username}</u>`);
		}
	}

	async function enableProfile(profile: SupaProfile) {
		const confirm = await confirmModal({ body: `Enable user <u>${profile.username}</u>?` });
		if (!confirm) return;

		const { status } = await fetch(`/api/user/enable/${profile.uid}`);

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
	<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
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
	</section>
	{#if filtered_profiles}
		<Table elements={filtered_profiles} {columns}>
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
