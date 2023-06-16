<script lang="ts">
	import { searchStore } from '$lib/store';

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
		if (event.ctrlKey && event.key === 'f') {
			event.preventDefault();
			searchInputElement.focus();
		}
	}
</script>

<svelte:window on:keydown={handleKeyPress} />

<div id="search" class="w-full lg:w-4/5 mx-auto hidden md:flex">
	<!-- Search fields -->
	<div
		id="search-input-field"
		class="input-group input-group-divider grid-cols-9 lg:grid-cols-7"
	>
		<!-- svelte-ignore a11y-autofocus -->
		<section class="col-span-5 flex w-full">
			<div class="input-group-shim">
				<label for="search" class="w-fit">Search</label>
			</div>
			<input
				type="search"
				id="search"
				placeholder="Search"
				class="w-full"
				aria-label="search query"
				bind:this={searchInputElement}
				bind:value={$searchStore.search}
				tabindex={1.1}
			/>
		</section>
		<section class="col-span-2 lg:col-span-1 flex w-full">
			<div class="input-group-shim">
				<label for="minimum-price">Min</label>
			</div>
			<input
				bind:value={$searchStore.price_min}
				type="text"
				id="minimum-price"
				aria-label="search min price"
				placeholder="Min €"
				class="w-full"
				tabindex={1.2}
			/>
		</section>
		<section class="col-span-2 lg:col-span-1 flex w-full">
			<div class="input-group-shim">
				<label for="maximum-price">Max</label>
			</div>
			<input
				bind:value={$searchStore.price_max}
				type="text"
				id="maximum-price"
				aria-label="search max price"
				placeholder="Max €"
				class="w-full"
				tabindex={1.3}
			/>
		</section>
	</div>
	<!-- Execute Search Button -->
	<button
		class="btn px-3"
		on:click={executeSearch}
		aria-label="execute search"
		tabindex={1.4}
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
