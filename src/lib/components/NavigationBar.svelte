<script lang="ts">
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import SearchDesktop from './SearchDesktop.svelte';
	import SearchMobile from './SearchMobile.svelte';

	function openDrawer(): void {
		drawerStore.open();
	}
</script>

<nav id="navigation-bar">
	<AppBar padding="p-0 py-4 md:p-4">
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
