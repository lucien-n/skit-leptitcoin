<script lang="ts">
	import { LISTING_CATEGORIES } from '$lib/helper';

	export let value = LISTING_CATEGORIES[0].toLowerCase();
	export let disabled: boolean = false;
</script>

<select id="category" name="category" class="select" bind:value {disabled}>
	{#each LISTING_CATEGORIES as category}
		<option value={category.toLowerCase()}>{category}</option>
	{/each}
</select>
