<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { successToast, warnToast } from '$lib/helper';
	import { confirmModal } from '$lib/modals';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let profile: SupaProfile;

	$: profile = profile;

	async function disableUser() {
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

	async function deleteUser() {
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

	async function enableUser() {
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

{#if profile}
	<div
		class="group card flex h-fit w-full flex-row items-center justify-between gap-4 border-warning-500 p-2"
		class:border={profile.restricted}
	>
		<div class="m-1 flex flex-row gap-4">
			<Avatar initials={profile.username[0]} />
			<div>
				<a href="/u/{profile.username}" class="h3 hover:underline">
					<h3>{profile.username}</h3>
				</a>
				<div>
					<p>Rating: <span class="bold">{profile.rating}</span></p>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-1">
			<button on:click={deleteUser} class="btn variant-glass-error aspect-square p-2">
				<Icon name="trash" />
			</button>
			{#if profile.restricted}
				<button on:click={enableUser} class="btn variant-glass-success aspect-square p-2">
					<Icon name="check" />
				</button>
			{:else}
				<button on:click={disableUser} class="btn variant-glass-secondary aspect-square p-2">
					<Icon name="slash" />
				</button>
			{/if}
		</div>
	</div>
{:else}
	<p class="text-error-500">Cannot find user</p>
{/if}
