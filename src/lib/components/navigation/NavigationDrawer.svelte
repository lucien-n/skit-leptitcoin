<script lang="ts">
	import { userStore } from '$lib/store';
	import HomeSvg from '$lib/components/svgs/HomeSvg.svelte';
	import LogInSvg from '$lib/components/svgs/LogInSvg.svelte';
	import LogOutSvg from '$lib/components/svgs/LogInSvg.svelte';
	import UserSvg from '$lib/components/svgs/UserSvg.svelte';
	import Drawer from '$lib/components/drawer/Drawer.svelte';
</script>

<!-- <nav id="navigation-drawer" class="list-nav flex h-full flex-col justify-between p-4"> -->
<Drawer>
	<svelte:fragment slot="lead" let:D>
		<D.Link href="/">
			<D.Icon><HomeSvg /></D.Icon>
			<D.Text>LePtitCoin</D.Text>
		</D.Link>
	</svelte:fragment>
	<svelte:fragment slot="tail" let:D>
		{#if $userStore}
			<D.Link href="/u/{$userStore.id}">
				<D.Icon><UserSvg /></D.Icon>
				<D.Text>My Profile</D.Text>
			</D.Link>
			<D.Link href="/auth/signout">
				<LogOutSvg />
				<D.Text>Sign Out</D.Text>
			</D.Link>
		{:else}
			<D.Link href="/auth/signin">
				<D.Icon><LogInSvg /></D.Icon>
				<D.Text>Sign In</D.Text>
			</D.Link>
		{/if}
	</svelte:fragment>
</Drawer>
