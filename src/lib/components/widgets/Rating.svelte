<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let rating: number;
	export let rating_count = 0;

	const dispatch = createEventDispatcher();

	const rate = async (i: number) => {
		rating = i + 1;
		dispatch('click');
	};
</script>

<section id="rating" class="flex">
	{#each { length: 5 } as _, i}
		<button on:click={() => rate(i)} aria-label="rate {i}">
			{#if rating > i}
				<Icon name="star_filled" />
			{:else}
				<Icon name="star" />
			{/if}
		</button>
	{/each}
	<p class="ml-1">
		{#if rating_count > -1}
			({rating_count})
		{/if}
	</p>
</section>
