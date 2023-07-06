<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import StarFilledSvg from '$lib/components/svgs/StarFilledSvg.svelte';
	import StarSvg from '$lib/components/svgs/StarSvg.svelte';

	export let rating: number;
	export let rated_user_uid: string;
	export let rating_count: number = 0;

	const dispatch = createEventDispatcher();

	const rate = async (i: number) => {
		rating = i + 1;
		dispatch('click');
		if (0 < rating && rating <= 5) fetch(`/u/${rated_user_uid}/rate/${rating}`);
	};
</script>

<section id="rating" class="flex">
	{#each { length: 5 } as _, i}
		<button on:click={() => rate(i)} aria-label="rate {i}">
			{#if rating > i}
				<StarFilledSvg />
			{:else}
				<StarSvg />
			{/if}
		</button>
	{/each}
	<p class="ml-1">
		{#if rating_count > -1}
			({rating_count})
		{/if}
	</p>
</section>
