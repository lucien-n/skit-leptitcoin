<script lang="ts">
	import Drawer from '$comp/widgets/drawer/Drawer.svelte';
	import { profileStore, settingsStore } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';
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
		{#if $profileStore}
			<D.Link href="/profile/{$profileStore?.username}">
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
		<D.Link keep_opened>
			<SlideToggle name="hight-contrast" bind:checked={$settingsStore.high_contrast} />
			<D.Text>Hight Contrast</D.Text>
		</D.Link>
	</svelte:fragment>
</Drawer>
