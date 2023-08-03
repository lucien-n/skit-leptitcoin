<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { profileStore, sessionStore } from '$lib/store';
	import { dislikeListing, isLikedByUser, likeListing } from '$supa/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let listing_uid: string;
	$: liked = false;

	// TODO: Update listing like
	const unsubscribe = sessionStore.subscribe(async (session) => {
		if (!session || !session.user || listing_uid === 'none') return;
		if (await isLikedByUser({ listing_uid, user_uid: session.user.id })) liked = true;
	});

	async function toggleLike() {
		if (listing_uid === 'none') return;

		if (!$profileStore) {
			toastStore.trigger({
				message: 'You must be signed in',
				background: 'variant-glass-warn'
			});
			return;
		}

		liked = !liked;
		if (liked) {
			const { status } = await fetch(`/api/listing/like/${listing_uid}`);
			if (status === 200) liked = true;
		} else {
			const { status } = await fetch(`/api/listing/dislike/${listing_uid}`);
			if (status === 200) liked = false;
		}
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
