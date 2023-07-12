<script lang="ts">
	import { searchStore } from '$lib/store';
	import CategorySelector from '$lib/components/navigation/CategorySelector.svelte';
	import Icon from '$lib/components/widgets/Icon.svelte';

	export let showAdvancedSearchOption: boolean = false;

	function executeSearch(): void {
		showAdvancedSearchOption = false;
		console.group('search');
		console.log('Search:       ', $searchStore.search);
		console.log('Category:     ', $searchStore.category);
		console.log('Price Min:    ', $searchStore.price_min);
		console.log('Price Max:    ', $searchStore.price_max);
		console.groupEnd();
	}
</script>

<!-- svelte-ignore a11y-positive-tabindex -->
<div id="search-mobile" class="flex w-full flex-col lg:hidden">
	<div id="search-input-fields" class="flex">
		<div class="input-group flex justify-between">
			<input type="search" placeholder="Search" class="w-max" bind:value={$searchStore.search} />
			<div>
				<button
					type="button"
					aria-label="toggle advanced search options"
					on:click={() => (showAdvancedSearchOption = !showAdvancedSearchOption)}
				>
					{#if showAdvancedSearchOption}
						<Icon name="chevron_up" />
					{:else}
						<Icon name="chevron_down" />
					{/if}
				</button>
				<button on:click={executeSearch} aria-label="execute search">
					<Icon name="search" />
				</button>
			</div>
		</div>
	</div>

	<div id="advanced-search-options">
		{#if showAdvancedSearchOption}
			<div class="visible mt-4 gap-4 p-2 md:hidden">
				<label for="price" class="h3 py-1">Price</label>
				<section id="price" class="input-group grid-cols-6">
					<div class="input-group-shim col-span-1">
						<label for="minimum-price">Min</label>
					</div>
					<input
						bind:value={$searchStore.price_min}
						type="number"
						min="0"
						step="5"
						id="minimum-price"
						placeholder="Min"
						class="col-span-2"
						aria-label="minimum price (in euros)"
					/>
					<div class="input-group-shim col-span-1">
						<label for="maximum-price">Max</label>
					</div>
					<input
						bind:value={$searchStore.price_max}
						type="number"
						min="5"
						step="5"
						id="maximum-price"
						class="col-span-2"
						placeholder="Max"
						aria-label="maximum price (in euros)"
					/>
				</section>
				<label for="category" class="h3 py-1">Category</label>
				<section id="category">
					<CategorySelector bind:value={$searchStore.category} />
				</section>
				<div class="mt-2 flex w-full items-center justify-center">
					<button
						type="button"
						aria-label="execute search"
						class="btn variant-ghost-surface"
						on:click={executeSearch}>Search</button
					>
				</div>
			</div>
		{/if}
	</div>
</div>
