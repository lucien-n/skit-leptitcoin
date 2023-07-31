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
		if (liked) await likeListing({ listing_uid, user_uid: $profileStore.uid });
		else await dislikeListing({ listing_uid, user_uid: $profileStore.uid });
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
