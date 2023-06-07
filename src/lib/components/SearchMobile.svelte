<script lang="ts">
	import { searchStore } from '$lib/store';
	import CategorySelector from './CategorySelector.svelte';

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
<div id="search" class="w-full flex md:hidden mx-auto flex-col">
	<div id="search-input-fields" class="flex">
		<!-- Search fields -->
		<div class="input-group input-group-divider flex">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="search"
				placeholder="Search"
				class="w-full"
				bind:value={$searchStore.search}
				tabindex={1.1}
			/>
			<button
				type="button"
				aria-label="toggle advanced search options"
				class="btn mx-auto"
				tabindex={1.2}
				on:click={() =>
					(showAdvancedSearchOption = !showAdvancedSearchOption)}
			>
				{#if showAdvancedSearchOption}
					<svg
						data-testid="geist-icon"
						fill="none"
						height="24"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="24"
						style="color:var(--geist-foreground)"
						><path d="M18 15l-6-6-6 6" /></svg
					>{:else}
					<svg
						data-testid="geist-icon"
						fill="none"
						height="24"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="24"
						style="color:var(--geist-foreground)"
						><path d="M6 9l6 6 6-6" /></svg
					>
				{/if}
			</button>
		</div>
		<!-- Execute Search Button -->
		<button
			class="btn px-3"
			on:click={executeSearch}
			aria-label="execute search"
			tabindex="100"
		>
			<svg
				data-testid="geist-icon"
				fill="none"
				height="24"
				shape-rendering="geometricPrecision"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				width="24"
				style="color:var(--geist-foreground)"
				><path
					d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"
				/><path d="M16 16l4.5 4.5" /></svg
			>
		</button>
	</div>
	<div id="advanced-search-options">
		{#if showAdvancedSearchOption}
			<div class="p-2 visible md:hidden mt-4 gap-4">
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
						tabindex={1.3}
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
						tabindex={1.4}
					/>
				</section>
				<label for="category" class="h3 py-1">Category</label>
				<section id="category">
					<CategorySelector bind:value={$searchStore.category} />
				</section>
			</div>
			<hr />
			<div class="w-full items-center justify-center mt-2 flex">
				<button
					type="button"
					aria-label="execute search"
					tabindex={1.5}
					class="btn variant-ghost-surface"
					on:click={executeSearch}>Search</button
				>
			</div>
		{/if}
	</div>
</div>
