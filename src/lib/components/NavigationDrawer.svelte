<script lang="ts">
	import DrawerLink from '$lib/components/DrawerLink.svelte';
	import HomeSvg from '$lib/components/svgs/HomeSvg.svelte';
	import SignInSvg from '$lib/components/svgs/SignInSvg.svelte';
</script>

<nav id="navigation-drawer" class="list-nav h-full p-4">
	<ul class="h-full flex flex-col justify-between overflow-hidden">
		<DrawerLink href="/">
			<HomeSvg />
			<h4 class="h4">LePtitCoin</h4>
		</DrawerLink>
		<DrawerLink href="/auth/signin">
			<SignInSvg />
			<h4 class="h4">Sign In</h4>
		</DrawerLink>
	</ul>
</nav>
