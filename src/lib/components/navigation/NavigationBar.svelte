<script lang="ts">
	import SearchDesktop from '$lib/components/navigation/SearchDesktop.svelte';
	import SearchMobile from '$lib/components/navigation/SearchMobile.svelte';
	import HamburgerSvg from '$lib/components/svgs/HamburgerSvg.svelte';
	import HomeSvg from '$lib/components/svgs/HomeSvg.svelte';
	import LogInSvg from '$lib/components/svgs/LogInSvg.svelte';
	import PlusSvg from '$lib/components/svgs/PlusSvg.svelte';
	import UserSvg from '$lib/components/svgs/UserSvg.svelte';
	import { supaUserStore, userStore } from '$lib/store';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import LayoutSvg from '../svgs/LayoutSvg.svelte';

	const HIDE_ACTION_TEXT = false;

	function openDrawer(): void {
		drawerStore.open();
	}

	const toggleUserDrawer = () => {
		drawerStore.open({
			id: 'user',
			bgDrawer: 'variant-glass',
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			rounded: 'rounded-xl',
			position: 'right'
		});
	};
</script>

{#key $userStore}
	<nav id="navigation-bar">
		<AppBar padding="p-0 py-4 md:p-2">
			<svelte:fragment slot="lead">
				<a href="/#main" aria-label="skip to content" class="absolute -top-40 focus:top-0">
					skip to content
				</a>
				<div class="flex flex-row items-center md:gap-2">
					<button class="btn btn-sm md:hidden" aria-label="toggle menu" on:click={openDrawer}>
						<span>
							<HamburgerSvg />
						</span>
					</button>
					<a href="/" class="hidden items-center gap-1 md:flex" aria-label="homepage">
						<HomeSvg />
						<h4 class="h4" class:hidden={HIDE_ACTION_TEXT}>LePtitCoin</h4>
					</a>
				</div>
			</svelte:fragment>

			<SearchDesktop />
			<SearchMobile />

			<svelte:fragment slot="trail">
				<div class="flex w-full gap-2">
					<div class="hidden flex-row items-center gap-3 md:flex">
						{#if $userStore}
							<a href="/new" class="flex flex-col items-center" aria-label="new listing">
								<PlusSvg />
								<p class="text-sm" class:hidden={HIDE_ACTION_TEXT}>New</p>
							</a>
							{#if $supaUserStore?.role && $supaUserStore.role % 8 === 0}
								<a href="/admin/dashboard" class="flex flex-col items-center">
									<LayoutSvg />
									<p class="text-sm">Dashboard</p>
								</a>
							{/if}
							<button class="flex flex-col items-center" on:click={toggleUserDrawer}>
								<UserSvg />
								{#if $supaUserStore}
									<p class="text-sm">{$supaUserStore.username}</p>
								{:else}
									<div class="placeholder variant-ghost-primary mt-1 h-2 w-8 animate-bounce" />
								{/if}
							</button>
						{:else}
							<a href="/auth/signin" class="flex flex-col items-center" aria-label="sign in">
								<LogInSvg />
								<p class="text-sm" class:hidden={HIDE_ACTION_TEXT}>Sign In</p>
							</a>
						{/if}
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</nav>
{/key}
