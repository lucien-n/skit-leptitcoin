<script lang="ts">
	import type { SupaUser } from '$lib/types';
	import { Avatar, modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { successToast, warnToast } from '$lib/helper';
	import Icon from '$comp/widgets/Icon.svelte';

	export let user: SupaUser;

	async function disableUser() {
		const confirm = await new Promise<boolean>((resolve) => {
			modalStore.trigger({
				type: 'confirm',
				title: 'Please Confirm',
				body: `Disable user <u>${user.username}</u>?<br>This action is <strong>reversible</strong>`,
				response: (r: boolean) => {
					resolve(r);
				}
			});
		});
		if (!confirm) return;
		const { status, body } = await fetch(`/admin/user/disable/${user.uid}`);

		console.log(body);

		if (status === 200) {
			successToast(`User <u>${user.username}</u> disabled`);
		} else {
			warnToast(`Error while disabling user <u>${user.username}</u>`);
		}
	}

	async function deleteUser() {
		const confirm = await new Promise<boolean>((resolve) => {
			modalStore.trigger({
				type: 'confirm',
				title: 'Please Confirm',
				body: `Delete user <u>${user.username}</u>?<br>This action is <strong>irreversible</strong>`,
				response: (r: boolean) => {
					resolve(r);
				}
			});
		});
		if (!confirm) return;
		const { status, body } = await fetch(`/admin/user/delete/${user.uid}`);

		console.log(body);

		if (status === 200) {
			successToast(`User <u>${user.username}</u> deleted`);
		} else {
			warnToast(`Error while deleting user <u>${user.username}</u>`);
		}
	}
</script>

{#if user}
	<div class="group card flex h-fit w-full flex-row items-center justify-between gap-4 p-2">
		<div class="m-1 flex flex-row gap-4">
			<Avatar initials={user.username[0]} />
			<div>
				<a href="/u/{user.uid}" class="h3 hover:underline">
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
			<button on:click={disableUser} class="btn variant-glass-secondary aspect-square p-2">
				<Icon name="slash" />
			</button>
		</div>
	</div>
{:else}
	<p class="text-error-500">Cannot find user</p>
{/if}
