<script lang="ts">
	import DrawerLink from './DrawerLink.svelte';
</script>

<nav id="navigation-drawer" class="list-nav h-full p-4">
	<ul class="h-full flex flex-col justify-between overflow-hidden">
		<DrawerLink href="/">
			<svg
				data-testid="geist-icon"
				fill="none"
				height="24"
				shape-rendering="geometricPrecision"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				width="24"
				style="color:var(--geist-foreground)"
				><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path
					d="M9 22V12h6v10"
				/></svg
			>
			<h4 class="h4 hidden">LePtitCoin</h4>
		</DrawerLink>
		<DrawerLink href="/auth/signin">
			<svg
				data-testid="geist-icon"
				fill="none"
				height="24"
				shape-rendering="geometricPrecision"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				width="24"
				style="color:var(--geist-foreground)"
				><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
					d="M10 17l5-5-5-5"
				/><path d="M15 12H3" /></svg
			>
			<h4 class="h4 mb-[1px] hidden">Sign In</h4>
		</DrawerLink>
	</ul>
</nav>
