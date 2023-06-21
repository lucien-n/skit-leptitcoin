<script lang="ts">
	import SearchDesktop from '$lib/components/SearchDesktop.svelte';
	import SearchMobile from '$lib/components/SearchMobile.svelte';
	import { userStore } from '$lib/store';
	import { supabase } from '$lib/supabase';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import HamburgerSvg from '$lib/components/svgs/HamburgerSvg.svelte';
	import HomeSvg from '$lib/components/svgs/HomeSvg.svelte';
	import LogOutSvg from '$lib/components/svgs/LogOutSvg.svelte';
	import LogInSvg from '$lib/components/svgs/LogInSvg.svelte';
	import PlusSvg from '$lib/components/svgs/PlusSvg.svelte';

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
						<HamburgerSvg />
					</span>
				</button>
				<a
					href="/"
					class="items-center gap-1 hidden md:flex"
					aria-label="homepage"
					tabindex={1.02}
				>
					<HomeSvg />
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
							<PlusSvg />
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
							<LogOutSvg />
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
							<LogInSvg />
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
