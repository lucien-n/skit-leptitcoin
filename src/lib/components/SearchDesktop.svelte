<script lang="ts">
	import { searchStore } from '$lib/store';

	export const tabIndexOffset: number = 0;
	let searchInputElement: HTMLInputElement;

	function executeSearch(): void {
		console.group('search');
		console.log('Search:       ', $searchStore.search);
		console.log('Category:     ', $searchStore.category);
		console.log('Price Min:    ', $searchStore.price_min);
		console.log('Price Max:    ', $searchStore.price_max);
		console.groupEnd();
	}

	function handleKeyPress(event: KeyboardEvent) {
		event.preventDefault();
		if (event.ctrlKey && event.key === 'f') {
			searchInputElement.focus();
		}
	}
</script>

<svelte:window on:keydown={handleKeyPress} />

<div id="search" class="w-full lg:w-4/5 mx-auto hidden md:flex">
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
			aria-label="search query"
			bind:this={searchInputElement}
			bind:value={$searchStore.search}
		/>
		<input
			bind:value={$searchStore.price_min}
			type="text"
			aria-label="search min price"
			placeholder="Min €"
		/>
		<input
			bind:value={$searchStore.price_max}
			type="text"
			aria-label="search max price"
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
