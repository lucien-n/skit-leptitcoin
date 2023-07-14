<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { AppShell, Drawer, Modal, Toast, drawerStore } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import '../dark-theme.postcss';
	import { getSupaUser } from '$lib/supabase';
	import { supaUserStore, userStore } from '$lib/store';
	import NavigationBar from '$comp/navigation/NavigationBar.svelte';
	import NavigationDrawer from '$comp/navigation/NavigationDrawer.svelte';
	import UserDrawer from '$comp/user/UserDrawer.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: {
		userStore.set(session ? session.user : null);
		updateSupaUser(session?.user.id);
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event: any, _session: any) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
			userStore.set(_session ? _session.user : null);
			updateSupaUser(session?.user.id);
		});

		return () => data.subscription.unsubscribe();
	});

	async function updateSupaUser(user_uid: string | undefined) {
		supaUserStore.set(user_uid ? await getSupaUser({ uid: user_uid }) : null);
	}
</script>

<Toast position="tr" />
<Modal />

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
	<div class="h-full w-full overflow-hidden">
		<slot />
	</div>
</AppShell>
