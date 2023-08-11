<script lang="ts">
	import { invalidate } from '$app/navigation';
	import NavigationBar from '$comp/navigation/NavigationBar.svelte';
	import NavigationDrawer from '$comp/navigation/NavigationDrawer.svelte';
	import UserDrawer from '$comp/user/UserDrawer.svelte';
	import { confirmModal } from '$lib/modals';
	import { acknowledgedInDevStore } from '$lib/store';
	import { AppShell, Drawer, Modal, Toast, drawerStore, modalStore } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import '../dark-theme.postcss';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/vitals';
	import { page } from '$app/stores';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}

	async function showInDevModal() {
		$acknowledgedInDevStore = await confirmModal({
			title: 'In-Dev Website',
			body: 'This website is currently in-dev and may have issues<br/>Feel free to report them on <a class="hover:underline" href="github.com/lucien-neuhoff/skit-lepticoin/issues">github</a>'
		});
		if ($acknowledgedInDevStore) modalStore.close();
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event: any, _session: any) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		if (!$acknowledgedInDevStore) {
			setTimeout(showInDevModal, 1_000);
		}
		return () => data.subscription.unsubscribe();
	});
</script>

<Toast position="tr" />

<Drawer>
	{#if $drawerStore.id === 'navigation'}
		<NavigationDrawer />
	{:else if $drawerStore.id === 'user'}
		<UserDrawer />
	{/if}
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-80 lg:w-1/4 bg-surface-500/10">
	<svelte:fragment slot="header">
		<NavigationBar />
	</svelte:fragment>
	<div class="h-full w-full overflow-hidden bg-surface-500">
		<slot />
	</div>
</AppShell>

<Modal />
