<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let href: string = '/';

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<li>
	<a {href} class="flex w-full gap-1" on:click={closeDrawer}>
		<slot />
	</a>
</li>
