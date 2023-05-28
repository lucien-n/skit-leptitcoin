<script lang="ts">
	import { searchStore } from '$lib/store';

	function executeSearch(): void {
		console.group('search');
		console.log('Search:       ', $searchStore.search);
		console.log('Category:     ', $searchStore.category);
		console.log('Price Min:    ', $searchStore.price_min);
		console.log('Price Max:    ', $searchStore.price_max);
		console.groupEnd();
	}
</script>

<div id="search" class="w-3/5 mx-auto hidden md:flex">
	<!-- Search fields -->
	<div
		id="search-input-field"
		class="input-group input-group-divider grid-cols-8"
	>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="search"
			placeholder="Search"
			class="col-span-6"
			bind:value={$searchStore.search}
			autofocus
		/>
		<input
			bind:value={$searchStore.price_min}
			type="text"
			placeholder="Min €"
		/>
		<input
			bind:value={$searchStore.price_max}
			type="text"
			placeholder="Max €"
		/>
	</div>
	<!-- Execute Search Button -->
	<button
		class="btn px-3"
		on:click={executeSearch}
		aria-label="execute search"
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
