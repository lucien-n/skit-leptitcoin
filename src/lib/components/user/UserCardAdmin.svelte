<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { successToast, warnToast } from '$lib/helper';
	import { confirmModal } from '$lib/modals';
	import type { SupaUser } from '$lib/types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let user: SupaUser;

	$: user = user;

	async function disableUser() {
		const confirm = await confirmModal({
			body: `Disable user <u>${user.username}</u>?`
		});
		if (!confirm) return;

		const { status } = await fetch(`/api/user/disable/${user.uid}`);

		if (status === 200) {
			successToast(`User <u>${user.username}</u> disabled`);
			user.restricted = true;
		} else {
			warnToast(`Error while disabling user <u>${user.username}</u>`);
		}
	}

	async function deleteUser() {
		const confirm = await confirmModal({
			body: `Delete user <u>${user.username}</u>?<br>This action is <strong>irreversible</strong>`
		});
		if (!confirm) return;

		const { status } = await fetch(`/api/user/delete/${user.uid}`);

		if (status === 200) {
			successToast(`User <u>${user.username}</u> deleted`);
		} else {
			warnToast(`Error while deleting user <u>${user.username}</u>`);
		}
	}

	async function enableUser() {
		const confirm = await confirmModal({ body: `Enable user <u>${user.username}</u>?` });
		if (!confirm) return;

		const { status } = await fetch(`/api/user/enable/${user.uid}`);

		if (status === 200) {
			successToast(`User <u>${user.username}</u> enabled`);
			user.restricted = false;
		} else {
			warnToast(`Error while enabling user <u>${user.username}</u>`);
		}
	}
</script>

{#if user}
	<div
		class="group card flex h-fit w-full flex-row items-center justify-between gap-4 border-warning-500 p-2"
		class:border={user.restricted}
	>
		<div class="m-1 flex flex-row gap-4">
			<Avatar initials={user.username[0]} />
			<div>
				<a href="/u/{user.username}" class="h3 hover:underline">
					<h3>{user.username}</h3>
				</a>
				<div>
					<p>Rating: <span class="bold">{user.rating}</span></p>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-1">
			<button on:click={deleteUser} class="btn variant-glass-error aspect-square p-2">
				<Icon name="trash" />
			</button>
			{#if user.restricted}
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
