<script lang="ts">
	import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import UserSvg from '$lib/components/svgs/UserSvg.svelte';

	const userDrawerSettings: DrawerSettings = {
		id: 'user',
		bgDrawer: 'bg-purple-900 text-white',
		bgBackdrop:
			'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	};

	const toggleUserDrawer = () => {
		drawerStore.open(userDrawerSettings);
	};
</script>

<button class="flex" on:click={toggleUserDrawer}>
	<UserSvg />
</button>
