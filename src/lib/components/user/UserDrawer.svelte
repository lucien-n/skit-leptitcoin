<script lang="ts">
	import { userStore } from '$lib/store';
	import Drawer from '$comp/drawer/Drawer.svelte';
</script>

<Drawer>
	<svelte:fragment slot="lead" let:D>
		<D.Link href="/u/{$userStore?.id}">
			<D.Icon name="user" />
			<D.Text>My Profile</D.Text>
		</D.Link>
	</svelte:fragment>
	<svelte:fragment slot="tail" let:D>
		<D.Link href="/auth/signout">
			<D.Icon name="log_out" />
			<D.Text>Sign Out</D.Text>
		</D.Link>
	</svelte:fragment>
</Drawer>
