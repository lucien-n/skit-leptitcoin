<script lang="ts">
	import StarSvg from '$lib/assets/star.svg?raw';
	import StarFilledSvg from '$lib/assets/star-filled.svg?raw';
	import { createEventDispatcher } from 'svelte';

	export let rating: number;
	export let ratedUserUid: string;

	const dispatch = createEventDispatcher();

	const rate = async (i: number) => {
		rating = i + 1;
		dispatch('click');
		if (0 < rating && rating <= 5)
			fetch(`/u/${ratedUserUid}/rate/${rating}`);
	};
</script>

<section id="rating" class="flex">
	{#each { length: 5 } as _, i}
		<button on:click={() => rate(i)}>
			{#if rating > i}
				{@html StarFilledSvg}
			{:else}
				{@html StarSvg}
			{/if}
		</button>
	{/each}
</section>
