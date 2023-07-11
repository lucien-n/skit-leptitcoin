<script lang="ts">
	import { searchStore } from '$lib/store';
	import Icon from '$lib/components/widgets/Icon.svelte';

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

<div id="search-desktop" class="mx-auto hidden w-full lg:flex xl:w-4/5">
	<!-- Search fields -->
	<div
		id="search-input-field"
		class="input-group input-group-divider grid-cols-12 xl:grid-cols-9 2xl:grid-cols-7"
	>
		<!-- svelte-ignore a11y-autofocus -->
		<section class="relative col-span-5 flex w-full">
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
			/>
			{#if $searchStore.category !== undefined && $searchStore.category !== ''}
				<button
					class="badge variant-ghost-primary absolute right-1 flex self-center"
					on:click={() => ($searchStore.category = '')}
				>
					<span class="flex h-5 w-5 items-center">
						<Icon name="cross_circle" />
					</span>
					<p>
						{$searchStore.category}
					</p>
				</button>
			{/if}
		</section>
		<section class="col-span-3 flex w-full xl:col-span-2 2xl:col-span-1">
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
			/>
		</section>
		<section class="col-span-3 flex w-full xl:col-span-2 2xl:col-span-1">
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
			/>
		</section>
	</div>
	<!-- Execute Search Button -->
	<button class="btn px-3" on:click={executeSearch} aria-label="execute search">
		<Icon name="search" />
	</button>
</div>
