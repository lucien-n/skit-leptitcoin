<script lang="ts">
	import CategorySelector from '$comp/navigation/CategorySelector.svelte';
	import Icon from '$comp/widgets/Icon.svelte';

	let price_min: number;
	let price_max: number;
	let category: string;

	let enable_category_search: boolean = true;
	let enable_price_search: boolean = true;
</script>

<section class="card mx-2 flex h-fit w-full flex-col gap-2 p-3 md:w-1/2 xl:w-2/5">
	<section class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<input type="checkbox" id="enable-price-search" bind:checked={enable_price_search} />
			<label for="enable-price-search">
				<h5 class="h5">Price (€)</h5>
			</label>
		</div>
		<section>
			<label for="search-price-min">Min</label>
			<input
				id="search-price-min"
				class="input"
				type="number"
				min="0.01"
				step="0.01"
				max="999999.99"
				bind:value={price_min}
				disabled={!enable_price_search}
			/>
		</section>

		<section>
			<label for="search-price-max">Max</label>

			<input
				id="search-price-max"
				class="input"
				type="number"
				min="0.01"
				step="0.01"
				max="999999.99"
				bind:value={price_max}
				disabled={!enable_price_search}
			/>
		</section>
	</section>

	<hr />

	<section class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<input type="checkbox" id="enable-category-search" bind:checked={enable_category_search} />
			<label for="enable-category-search">
				<h5 class="h5">Category</h5>
			</label>
		</div>
		<CategorySelector bind:value={category} disabled={!enable_category_search} />
	</section>

	<hr />

	<section class="bottom-2 top-auto">
		<button class="btn variant-ghost-surface w-full">
			<p>Search</p>
			<Icon name="search" />
		</button>
	</section>
</section>
