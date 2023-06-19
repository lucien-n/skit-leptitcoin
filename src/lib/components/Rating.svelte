<script lang="ts">
	import StarSvg from '$lib/assets/star.svg?raw';
	import StarFilledSvg from '$lib/assets/star-filled.svg?raw';
	import { createEventDispatcher } from 'svelte';

	export let rating: number;

	const dispatch = createEventDispatcher();
</script>

<section id="rating" class="flex">
	{#each { length: 5 } as _, i}
		<button
			on:click={() => {
				rating = i + 1;
				dispatch('click');
			}}
		>
			{#if rating > i}
				{@html StarFilledSvg}
			{:else}
				{@html StarSvg}
			{/if}
		</button>
	{/each}
</section>
