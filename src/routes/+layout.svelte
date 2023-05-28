<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import '../dark-theme.postcss';

	import { Toast, Modal, AppShell } from '@skeletonlabs/skeleton';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<svelte:head><title>LePtitCoin</title></svelte:head>

<Toast position="tr" />
<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<NavigationBar />
	</svelte:fragment>
	<slot />
</AppShell>
