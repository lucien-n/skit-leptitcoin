<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let href: string = '/';
	export let reload: boolean = false;

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<li>
	{#if reload}
		<a
			{href}
			class="flex w-full gap-1"
			on:click={closeDrawer}
			data-sveltekit-reload
		>
			<slot />
		</a>
	{:else}
		<a {href} class="flex w-full gap-1" on:click={closeDrawer}>
			<slot />
		</a>
	{/if}
</li>
