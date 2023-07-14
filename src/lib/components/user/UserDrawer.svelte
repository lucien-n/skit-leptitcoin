<script lang="ts">
	import { settingsStore, supaUserStore, userStore } from '$lib/store';
	import Drawer from '$comp/drawer/Drawer.svelte';
	import { LightSwitch, SlideToggle } from '@skeletonlabs/skeleton';
</script>

<Drawer>
	<svelte:fragment slot="lead" let:D>
		<D.Link href="/u/{$supaUserStore?.username}">
			<D.Icon name="user" />
			<D.Text>My Profile</D.Text>
		</D.Link>
	</svelte:fragment>
	<svelte:fragment slot="tail" let:D>
		<D.Link keep_opened>
			<SlideToggle name="hight-contrast" bind:checked={$settingsStore.high_contrast} />
			<D.Text>Hight Contrast</D.Text>
		</D.Link>
		<D.Link href="/auth/signout">
			<D.Icon name="log_out" />
			<D.Text>Sign Out</D.Text>
		</D.Link>
	</svelte:fragment>
</Drawer>
