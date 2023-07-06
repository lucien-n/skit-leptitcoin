<script lang="ts">
	import Rating from '$lib/components/widgets/Rating.svelte';
	import { userStore } from '$lib/store';
	import type { SupaUser } from '$lib/types/supa_user';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let user: SupaUser | undefined;
	export let anonymous = true;
	export let showAnonymous = true;
	export let asCard = true;
</script>

{#if user}
	<div
		class="group card flex h-fit w-full flex-row items-center justify-between gap-4 border-0 md:w-fit"
		class:card={asCard}
		class:p-5={asCard}
	>
		<div class="flex flex-row gap-4">
			<Avatar initials={user.username[0]} />
			<div>
				<h3 class="h3 group-hover:underline">{user.username}</h3>
				<Rating rating={user.rating} rating_count={user.ratingCount} rated_user_uid={user.uid} />
			</div>
		</div>
		{#if !anonymous && showAnonymous && $userStore?.id === user.uid}
			<span class="md:mx-8" />
			<a href="?ano" class="btn variant-ghost-primary">See my public profile</a>
		{/if}
	</div>
{:else}
	<p class="text-error-500">Cannot find user</p>
{/if}
