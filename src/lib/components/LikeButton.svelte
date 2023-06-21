<script lang="ts">
	import { userStore } from '$lib/store';
	import { isListingLikedByUser, toggleListingLike } from '$lib/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import HeartFillSvg from '$lib/components/svgs/HeartFillSvg.svelte';
	import HeartSvg from '$lib/components/svgs/HeartSvg.svelte';

	export let listing_uid: string;
	export let index: number = 1;
	let liked = false;

	const unsubscribe = userStore.subscribe(async (user) => {
		if (!user) return;
		if (await isListingLikedByUser(listing_uid, user.id)) liked = true;
	});
	onMount(() => unsubscribe());

	async function toggleLike() {
		if (!$userStore) {
			toastStore.trigger({
				message: 'You must be signed in',
				background: 'variant-glass-warn',
			});
			return;
		}

		liked = !liked;
		await toggleListingLike(listing_uid, $userStore.id);
	}
</script>

<button
	on:click|stopPropagation={toggleLike}
	class="variant-glass-secondary aspect-square btn md:p-2 w-16 md:w-12"
	aria-label={liked ? 'dislike' : 'like'}
	tabindex={index}
>
	{#if liked}
		<HeartFillSvg />
	{:else}
		<HeartSvg />
	{/if}
</button>
