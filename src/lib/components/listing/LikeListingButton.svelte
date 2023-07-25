<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { userStore } from '$lib/store';
	import { dislikeListing, isLikedByUser, likeListing } from '$supa/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let listing_uid: string;
	let liked = false;

	const unsubscribe = userStore.subscribe(async (user) => {
		if (!user || listing_uid === 'none') return;
		if (await isLikedByUser({ listing_uid, user_uid: user.id })) liked = true;
	});

	onMount(() => unsubscribe());

	async function toggleLike() {
		if (listing_uid === 'none') return;

		if (!$userStore) {
			toastStore.trigger({
				message: 'You must be signed in',
				background: 'variant-glass-warn'
			});
			return;
		}

		liked = !liked;
		if (liked) await likeListing({ listing_uid, user_uid: $userStore.id });
		else await dislikeListing({ listing_uid, user_uid: $userStore.id });
	}
</script>

<button
	on:click|stopPropagation={toggleLike}
	class="btn variant-glass-secondary aspect-square p-2"
	aria-label={liked ? 'dislike' : 'like'}
>
	{#if liked}
		<Icon name="heart_fill" />
	{:else}
		<Icon name="heart" />
	{/if}
</button>
