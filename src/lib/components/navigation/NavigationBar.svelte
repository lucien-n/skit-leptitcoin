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
	import LinePlaceholder from '$lib/components/widgets/LinePlaceholder.svelte';
	import NavigationLinkGroup from '$lib/components/nav/NavLinkGroup.svelte';

	function openNavigationDrawer(): void {
		drawerStore.open({
			id: 'navigation',
			width: 'w-[280px] md:w-[480px]',
			rounded: 'rounded-0',
			position: 'left'
		});
	}

	const openUserDrawer = () => {
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
			<NavigationLinkGroup let:N>
				<N.Link href="#main" aria_label="skip to content" cc="absolute -top-40 focus:top-0">
					<N.Text>skip to content</N.Text>
				</N.Link>
				<N.Link on:click={openNavigationDrawer} cc="btn btn-sm md:hidden">
					<N.Icon>
						<HamburgerSvg />
					</N.Icon>
				</N.Link>
				<N.Link href="/" cc="hidden md:flex">
					<N.Icon><HomeSvg /></N.Icon>
					<N.Text>LePtitCoin</N.Text>
				</N.Link>
			</NavigationLinkGroup>
		</svelte:fragment>

		<SearchDesktop />
		<SearchMobile />

		<svelte:fragment slot="trail">
			<div class="hidden h-full flex-row items-center md:flex">
				<NavigationLinkGroup let:N>
					{#if $userStore}
						<N.Link href="/new">
							<N.Icon><PlusSvg /></N.Icon>
							<N.Text>New</N.Text>
						</N.Link>
						{#if $supaUserStore?.role && $supaUserStore.role % 8 === 0}
							<N.Link href="/admin/dashboard">
								<N.Icon><LayoutSvg /></N.Icon>
								<N.Text>Dashboard</N.Text>
							</N.Link>
						{/if}
						<N.Link on:click={openUserDrawer}>
							<N.Icon><UserSvg /></N.Icon>
							<N.Text>
								{#if $supaUserStore}
									{$supaUserStore.username}
								{:else}
									<LinePlaceholder w={16} />
								{/if}
							</N.Text>
						</N.Link>
					{:else}
						<N.Link href="/auth/signin" aria_label="sign in">
							<N.Icon><LogInSvg /></N.Icon>
							<N.Text>Sign In</N.Text>
						</N.Link>
					{/if}
				</NavigationLinkGroup>
			</div>
		</svelte:fragment>
	</AppBar>
{/key}
