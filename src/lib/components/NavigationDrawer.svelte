<script lang="ts">
	import HomeSvg from '$lib/assets/home.svg?raw';
	import SignInSvg from '$lib/assets/sign-in.svg?raw';
	import DrawerLink from '$lib/components/DrawerLink.svelte';
</script>

<nav id="navigation-drawer" class="list-nav h-full p-4">
	<ul class="h-full flex flex-col justify-between overflow-hidden">
		<DrawerLink href="/">
			{@html HomeSvg}
			<h4 class="h4">LePtitCoin</h4>
		</DrawerLink>
		<DrawerLink href="/auth/signin">
			{@html SignInSvg}
			<h4 class="h4">Sign In</h4>
		</DrawerLink>
	</ul>
</nav>
