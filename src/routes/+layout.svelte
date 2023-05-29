<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
<<<<<<< HEAD
<<<<<<< HEAD
	import '../dark-theme.postcss';
=======
>>>>>>> bee74c2 (wip: navbar)
=======
	import '../dark-theme.postcss';
>>>>>>> 7975d95 (feat: theme & auth forms)

	import { Toast, Modal, AppShell, Drawer } from '@skeletonlabs/skeleton';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import NavigationDrawer from '$lib/components/NavigationDrawer.svelte';
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
