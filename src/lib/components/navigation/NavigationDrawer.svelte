<script lang="ts">
	import Drawer from '$lib/components/drawer/Drawer.svelte';
	import { userStore } from '$lib/store';
</script>

<!-- <nav id="navigation-drawer" class="list-nav flex h-full flex-col justify-between p-4"> -->
<Drawer>
	<svelte:fragment slot="lead" let:D>
		<D.Link href="/">
			<D.Icon name="home" />
			<D.Text>LePtitCoin</D.Text>
		</D.Link>
	</svelte:fragment>
	<svelte:fragment slot="tail" let:D>
		{#if $userStore}
			<D.Link href="/u/{$userStore.id}">
				<D.Icon name="user" />
				<D.Text>My Profile</D.Text>
			</D.Link>
			<D.Link href="/auth/signout" reload>
				<D.Icon name="log_out" />
				<D.Text>Sign Out</D.Text>
			</D.Link>
		{:else}
			<D.Link href="/auth/signin">
				<D.Icon name="log_in" />
				<D.Text>Sign In</D.Text>
			</D.Link>
		{/if}
	</svelte:fragment>
</Drawer>
