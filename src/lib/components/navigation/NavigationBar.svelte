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
	import LayoutSvg from '$lib/components/svgs/LayoutSvg.svelte';
	import NavigationLink from '$lib/components/navigation/NavigationLink.svelte';
	import LinePlaceholder from '$lib/components/widgets/LinePlaceholder.svelte';

	function openDrawer(): void {
		drawerStore.open();
	}

	const toggleUserDrawer = () => {
		drawerStore.open({
			id: 'user',
			width: 'w-[280px] md:w-[480px]',
			rounded: 'rounded-0',
			position: 'right'
		});
	};
</script>

{#key $userStore}
	<AppBar padding="p-1" spacing="space-y-0">
		<svelte:fragment slot="lead">
			<NavigationLink href="#main" aria_label="skip to content" cc="absolute -top-40 focus:top-0">
				skip to content
			</NavigationLink>
			<NavigationLink on:click={openDrawer} cc="btn btn-sm md:hidden" let:N>
				<N.Icon>
					<HamburgerSvg />
				</N.Icon>
			</NavigationLink>
			<NavigationLink href="/" cc="hidden md:flex" let:N>
				<HomeSvg />
				LePtitCoin
			</NavigationLink>
		</svelte:fragment>

		<SearchDesktop />
		<SearchMobile />

		<svelte:fragment slot="trail">
			<div class="hidden h-full flex-row items-center md:flex">
				{#if $userStore}
					<NavigationLink href="/new" let:N>
						<PlusSvg />
						<N.Text>New</N.Text>
					</NavigationLink>
					{#if $supaUserStore?.role && $supaUserStore.role % 8 === 0}
						<NavigationLink href="/admin/dashboard" let:N>
							<LayoutSvg />
							<N.Text>Dashboard</N.Text>
						</NavigationLink>
					{/if}
					<NavigationLink on:click={toggleUserDrawer} let:N>
						<UserSvg />
						<N.Text>
							{#if $supaUserStore}
								{$supaUserStore.username}
							{:else}
								<LinePlaceholder w={16} />
							{/if}
						</N.Text>
					</NavigationLink>
				{:else}
					<NavigationLink href="/auth/signin" aria_label="sign in" let:N>
						<LogInSvg />
						<N.Text>Sign In</N.Text>
					</NavigationLink>
				{/if}
			</div>
		</svelte:fragment>
	</AppBar>
{/key}
