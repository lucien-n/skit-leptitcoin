<script lang="ts">
	import { invalidate } from '$app/navigation';
	import NavigationBar from '$lib/components/navigation/NavigationBar.svelte';
	import NavigationDrawer from '$lib/components/navigation/NavigationDrawer.svelte';
	import { AppShell, Drawer, Modal, Toast } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import '../dark-theme.postcss';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(
			(event: any, _session: any) => {
				if (_session?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			}
		);

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head><title>LePtitCoin</title></svelte:head>

<Toast position="tr" />
<Modal />

<Drawer>
	<NavigationDrawer />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-80 lg:w-1/4 bg-surface-500/10">
	<svelte:fragment slot="header">
		<NavigationBar />
	</svelte:fragment>
	<slot />
</AppShell>
