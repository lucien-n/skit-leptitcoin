<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { formatDate, successToast, warnToast } from '$lib/helper';
	import { confirmModal } from '$lib/modals';
	import { Avatar, SlideToggle } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	export let profiles: SupaProfile[] | null;

	type Search = {
		search: string;
		profile: string;
		toggleRestricted: boolean;
	};

	let search: Writable<Search> = writable({ search: '', profile: '', toggleRestricted: false });

	$: filtered_profiles = profiles;

	let columns = ['Picture', 'Username', 'Rating', 'Created', 'Actions'];

	search.subscribe(({ search, toggleRestricted, profile }: Search) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');
		const profile_regex = new RegExp(`${profile || ''}`, 'i');

		if (profiles)
			filtered_profiles = profiles.filter(
				(profile) => profile.username.match(search_regex) && profile.restricted == toggleRestricted
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
</script>

<section class="flex flex-col gap-4">
	<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
	<section class="flex items-center gap-3">
		<SlideToggle bind:checked={$search.toggleRestricted} name="toggleShowRestricted"
			>Toggle Show Restricted</SlideToggle
		>
		<input
			type="text"
			id="filterProfile"
			placeholder="Profile"
			class="input w-fit"
			bind:value={$search.profile}
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
		{#if filtered_profiles}
			<tbody>
				{#each filtered_profiles as profile}
					<tr class="even:bg-surface-700">
						<td><Avatar initials={profile.username[0]} /></td>
						<td class="text-center">{profile.username}</td>
						<td class="text-center">{profile.rating}</td>
						<td class="text-center">{formatDate(new Date(profile.created_at || 0).getTime())}</td>
						<td class="text-center">
							<button
								on:click={() => deleteProfile(profile)}
								class="btn variant-ghost-error m-1 aspect-square p-1"
							>
								<Icon name="trash" />
							</button>
							{#if profile.restricted}
								<button
									on:click={() => enableProfile(profile)}
									class="btn variant-ghost-success m-1 aspect-square p-1"
								>
									<Icon name="check" />
								</button>
							{:else}
								<button
									on:click={() => disableProfile(profile)}
									class="btn variant-ghost-secondary m-1 aspect-square p-1"
								>
									<Icon name="slash" />
								</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
</section>
