<script lang="ts">
	import type { SupaUser } from '$lib/types/supa_user';
	import { Avatar } from '@skeletonlabs/skeleton';
	import TrashSvg from '../svgs/TrashSvg.svelte';
	import SlashSvg from '../svgs/SlashSvg.svelte';

	export let user: SupaUser;

	function disableUser() {
		fetch(`/admin/delete/user/${user.uid}`);
	}

	function deleteUser() {
		fetch(`/admin/delete/user/${user.uid}`);
	}
</script>

{#if user}
	<div class="group card flex h-fit w-full flex-row items-center justify-between gap-4 p-2">
		<div class="flex flex-row gap-4 m-1">
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
				<TrashSvg />
			</button>
			<button on:click={disableUser} class="btn variant-glass-secondary aspect-square p-2">
				<SlashSvg />
			</button>
		</div>
	</div>
{:else}
	<p class="text-error-500">Cannot find user</p>
{/if}
