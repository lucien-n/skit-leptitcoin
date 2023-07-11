<script lang="ts">
	import { userStore } from '$lib/store';
	import LogOutSvg from '$lib/components/svgs/LogOutSvg.svelte';
	import Drawer from '$lib/components/drawer/Drawer.svelte';
</script>

<Drawer>
	<svelte:fragment slot="lead" let:D>
		<D.Link href="/u/{$userStore?.id}">
			<D.Text>My Profile</D.Text>
		</D.Link>
	</svelte:fragment>
	<svelte:fragment slot="tail" let:D>
		<D.Link href="/auth/signout">
			<D.Icon><LogOutSvg /></D.Icon>
			<D.Text>Sign Out</D.Text>
		</D.Link>
	</svelte:fragment>
</Drawer>
