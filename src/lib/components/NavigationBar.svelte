<script lang="ts">
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import SearchDesktop from './SearchDesktop.svelte';
	import SearchMobile from './SearchMobile.svelte';

	function openDrawer(): void {
		drawerStore.open();
	}
</script>

<<<<<<< HEAD
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
<<<<<<< HEAD
					><path
						d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					/><path d="M9 22V12h6v10" /></svg
=======
					><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></svg
>>>>>>> bee74c2 (wip: navbar)
=======
					><path
						d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					/><path d="M9 22V12h6v10" /></svg
>>>>>>> 7975d95 (feat: theme & auth forms)
				>
				<h4 class="h4">LePtitCoin</h4>
			</a>
		</div>
	</svelte:fragment>

	<div id="search" class="w-3/5 flex mx-auto">
		<!-- Search fields -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7975d95 (feat: theme & auth forms)
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
<<<<<<< HEAD
=======
		<div id="search-input-field" class="input-group input-group-divider grid-cols-8">
			<input type="search" placeholder="Search" class=" col-span-6" bind:value={search} />
>>>>>>> bee74c2 (wip: navbar)
=======
>>>>>>> 7975d95 (feat: theme & auth forms)
			<input bind:value={price_min} type="text" placeholder="Min €" />
			<input bind:value={price_max} type="text" placeholder="Max €" />
		</div>
		<!-- Execute Search Button -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7975d95 (feat: theme & auth forms)
		<button
			class="btn"
			on:click={executeSearch}
			aria-label="execute search"
		>
<<<<<<< HEAD
=======
		<button class="btn" on:click={executeSearch}>
>>>>>>> bee74c2 (wip: navbar)
=======
>>>>>>> 7975d95 (feat: theme & auth forms)
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
<<<<<<< HEAD
				><path
					d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"
				/><path d="M16 16l4.5 4.5" /></svg
=======
				><path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" /><path
					d="M16 16l4.5 4.5"
				/></svg
>>>>>>> bee74c2 (wip: navbar)
=======
				><path
					d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"
				/><path d="M16 16l4.5 4.5" /></svg
>>>>>>> 7975d95 (feat: theme & auth forms)
			>
		</button>
	</div>

	<svelte:fragment slot="trail">
		<div class="flex flex-row items-center gap-2">
<<<<<<< HEAD
<<<<<<< HEAD
			<a href="/auth/signin" class="flex items-center gap-1">
=======
			<a href="/signin" class="flex items-center gap-1">
>>>>>>> bee74c2 (wip: navbar)
=======
			<a href="/auth/signin" class="flex items-center gap-1">
>>>>>>> 7975d95 (feat: theme & auth forms)
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
<<<<<<< HEAD
					><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
						d="M10 17l5-5-5-5"
					/><path d="M15 12H3" /></svg
=======
					><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path d="M10 17l5-5-5-5" /><path
						d="M15 12H3"
					/></svg
>>>>>>> bee74c2 (wip: navbar)
=======
					><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
						d="M10 17l5-5-5-5"
					/><path d="M15 12H3" /></svg
>>>>>>> 7975d95 (feat: theme & auth forms)
				>
				<h4 class="h4 mb-[1px]">Sign In</h4>
			</a>
		</div>
	</svelte:fragment>
</AppBar>
=======
<nav id="navigation-bar">
	<AppBar padding="py-4" gap="gap-0">
		<svelte:fragment slot="lead">
			<div class="flex flex-row items-center md:gap-2">
				<button class="btn btn-sm md:hidden" on:click={openDrawer}>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-7 w-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</span>
				</button>
				<a href="/" class="items-center gap-1 hidden md:flex">
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
							d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/><path d="M9 22V12h6v10" /></svg
					>
					<h4 class="h4 hidden md:visible">LePtitCoin</h4>
				</a>
			</div>
		</svelte:fragment>

		<SearchDesktop />
		<SearchMobile />

		<svelte:fragment slot="trail">
			<div class="hidden md:flex flex-row items-center gap-2">
				<a href="/auth/signin" class="flex items-center gap-1">
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
							d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
						/><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></svg
					>
					<h4 class="h4 mb-[1px] hidden md:visible">Sign In</h4>
				</a>
			</div>
		</svelte:fragment>
	</AppBar>
</nav>
>>>>>>> 1dfa8b1 (ref/wip: responsive navbar and auth forms)
