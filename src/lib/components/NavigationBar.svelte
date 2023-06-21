<script lang="ts">
	import SearchDesktop from '$lib/components/SearchDesktop.svelte';
	import SearchMobile from '$lib/components/SearchMobile.svelte';
	import { userStore } from '$lib/store';
	import { supabase } from '$lib/supabase';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';

	const hideActionText = true;

	function openDrawer(): void {
		drawerStore.open();
	}

	function logout(): void {
		supabase.auth.signOut();
		userStore.set(null);
	}
</script>

<nav id="navigation-bar">
	<!-- svelte-ignore a11y-autofocus -->
	<AppBar padding="p-0 py-4 md:p-4">
		<svelte:fragment slot="lead">
			<a
				href="/#main"
				aria-label="skip to content"
				class="absolute -top-40 focus:top-0"
				tabindex={1.01}>skip to content</a
			>
			<div class="flex flex-row items-center md:gap-2">
				<button class="btn btn-sm md:hidden" on:click={openDrawer}>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</span>
				</button>
				<a
					href="/"
					class="items-center gap-1 hidden md:flex"
					aria-label="homepage"
					tabindex={1.02}
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
						class="w-8 h-8"
						><path
							d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/><path d="M9 22V12h6v10" /></svg
					>
					<h4 class="h4" class:hidden={hideActionText}>LePtitCoin</h4>
				</a>
			</div>
		</svelte:fragment>

		<SearchDesktop />
		<SearchMobile />

		<svelte:fragment slot="trail">
			<div class="flex gap-2">
				<!-- <div class="self-center">
					<LightSwitch />
				</div> -->
				{#if $userStore}
					<div class="hidden md:flex flex-row items-center gap-2">
						<a
							href="/new"
							class="flex items-center gap-2"
							aria-label="new listing"
							tabindex={1.91}
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
								class="w-8 h-8"
								><path d="M12 5v14" /><path d="M5 12h14" /></svg
							>
							<h4
								class="h4 mb-[1px]"
								class:hidden={hideActionText}
							>
								New
							</h4>
						</a>
					</div>
					<div class="hidden md:flex flex-row items-center gap-2">
						<a
							class="flex items-center gap-1"
							href="/auth/signout"
							aria-label="sign out"
							tabindex={1.92}
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
								style="color:var(--geist-foreground);width:24px;height:24px"
								class="w-8 h-8"
								><path
									d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
								/><path d="M16 17l5-5-5-5" /><path
									d="M21 12H9"
								/></svg
							>
							<h4
								class="h4 mb-[1px]"
								class:hidden={hideActionText}
							>
								Sign Out
							</h4>
						</a>
					</div>
				{:else}
					<div class="hidden md:flex flex-row items-center gap-2">
						<a
							href="/auth/signin"
							class="flex items-center gap-1"
							aria-label="sign in"
							tabindex={1.91}
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
								class="w-8 h-8"
								><path
									d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
								/><path d="M10 17l5-5-5-5" /><path
									d="M15 12H3"
								/></svg
							>
							<h4
								class="h4 mb-[1px]"
								class:hidden={hideActionText}
							>
								Sign In
							</h4>
						</a>
					</div>
				{/if}
			</div>
		</svelte:fragment>
	</AppBar>
</nav>
