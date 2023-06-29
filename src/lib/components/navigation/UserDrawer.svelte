<script lang="ts">
	import LogOutSvg from '../svgs/LogOutSvg.svelte';
	import DrawerLink from './DrawerLink.svelte';
	import DrawerLinkGroup from './DrawerLinkGroup.svelte';
	import { userStore } from '$lib/store';
</script>

<section class="list-nav h-full w-full p-4 flex flex-col justify-between">
	<DrawerLinkGroup>
		<DrawerLink href="/u/{$userStore?.id}">
			<h4 class="h4">My Profile</h4>
		</DrawerLink>
	</DrawerLinkGroup>
	<DrawerLinkGroup>
		<DrawerLink href="/auth/signout" reload={true}>
			<LogOutSvg />
			<h4 class="h4">Sign Out</h4>
		</DrawerLink>
	</DrawerLinkGroup>
</section>
