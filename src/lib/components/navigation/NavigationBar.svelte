<script lang="ts">
	import NavigationLinkGroup from '$lib/components/nav/NavLinkGroup.svelte';
	import SearchDesktop from '$lib/components/navigation/SearchDesktop.svelte';
	import SearchMobile from '$lib/components/navigation/SearchMobile.svelte';
	import LinePlaceholder from '$lib/components/widgets/LinePlaceholder.svelte';
	import { navigation_drawer, user_drawer } from '$lib/drawers';
	import { supaUserStore, userStore } from '$lib/store';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';

	function openNavigationDrawer(): void {
		drawerStore.open(navigation_drawer);
	}

	const openUserDrawer = () => {
		drawerStore.open(user_drawer);
	};
</script>

{#key $userStore}
	<AppBar padding="p-1">
		<svelte:fragment slot="lead">
			<NavigationLinkGroup let:N>
				<N.Link href="#main" aria_label="skip to content" cc="absolute -top-40 focus:top-0">
					<N.Text>skip to content</N.Text>
				</N.Link>
				<N.Link on:click={openNavigationDrawer} cc="btn px-1 h-full md:hidden">
					<N.Icon name="hamburger" />
				</N.Link>
				<N.Link href="/" cc="hidden md:flex">
					<N.Icon name="home" />
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
							<N.Icon name="plus" />
							<N.Text>New</N.Text>
						</N.Link>
						{#if $supaUserStore?.role && $supaUserStore.role % 8 === 0}
							<N.Link href="/admin/dashboard">
								<N.Icon name="layout" />
								<N.Text>Dashboard</N.Text>
							</N.Link>
						{/if}
						<N.Link on:click={openUserDrawer}>
							<N.Icon name="user" />
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
							<N.Icon name="log_in" />
							<N.Text>Sign In</N.Text>
						</N.Link>
					{/if}
				</NavigationLinkGroup>
			</div>
		</svelte:fragment>
	</AppBar>
{/key}
