<script lang="ts">
	import { AppBar, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	let search: string;
	let category: string;
	let price_min: number;
	let price_max: number;

	function executeSearch(): void {
		console.group('search');
		console.log('Search:       ', search);
		console.log('Category:     ', category);
		console.log('Price Min:    ', price_min);
		console.log('Price Max:    ', price_max);
		console.groupEnd();
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<div class="flex flex-row items-center gap-2">
			<a href="/" class="flex items-center gap-1">
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
<<<<<<< HEAD
					><path
						d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					/><path d="M9 22V12h6v10" /></svg
=======
					><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></svg
>>>>>>> bee74c2 (wip: navbar)
				>
				<h4 class="h4">LePtitCoin</h4>
			</a>
		</div>
	</svelte:fragment>

	<div id="search" class="w-3/5 flex mx-auto">
		<!-- Search fields -->
<<<<<<< HEAD
		<div
			id="search-input-field"
			class="input-group input-group-divider grid-cols-8"
		>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="search"
				placeholder="Search"
				class="col-span-6"
				bind:value={search}
				autofocus
			/>
=======
		<div id="search-input-field" class="input-group input-group-divider grid-cols-8">
			<input type="search" placeholder="Search" class=" col-span-6" bind:value={search} />
>>>>>>> bee74c2 (wip: navbar)
			<input bind:value={price_min} type="text" placeholder="Min €" />
			<input bind:value={price_max} type="text" placeholder="Max €" />
		</div>
		<!-- Execute Search Button -->
<<<<<<< HEAD
		<button
			class="btn"
			on:click={executeSearch}
			aria-label="execute search"
		>
=======
		<button class="btn" on:click={executeSearch}>
>>>>>>> bee74c2 (wip: navbar)
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
<<<<<<< HEAD
				><path
					d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"
				/><path d="M16 16l4.5 4.5" /></svg
=======
				><path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" /><path
					d="M16 16l4.5 4.5"
				/></svg
>>>>>>> bee74c2 (wip: navbar)
			>
		</button>
	</div>

	<svelte:fragment slot="trail">
		<div class="flex flex-row items-center gap-2">
<<<<<<< HEAD
			<a href="/auth/signin" class="flex items-center gap-1">
=======
			<a href="/signin" class="flex items-center gap-1">
>>>>>>> bee74c2 (wip: navbar)
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
<<<<<<< HEAD
					><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
						d="M10 17l5-5-5-5"
					/><path d="M15 12H3" /></svg
=======
					><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path d="M10 17l5-5-5-5" /><path
						d="M15 12H3"
					/></svg
>>>>>>> bee74c2 (wip: navbar)
				>
				<h4 class="h4 mb-[1px]">Sign In</h4>
			</a>
		</div>
	</svelte:fragment>
</AppBar>
