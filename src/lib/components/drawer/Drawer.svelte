<script lang="ts">
	import DrawerLink from '$lib/components/drawer/DrawerLink.svelte';
	import DrawerLinkIcon from '$lib/components/drawer/DrawerLinkIcon.svelte';
	import DrawerLinkText from '$lib/components/drawer/DrawerLinkText.svelte';
	import DrawerLinkGroup from './DrawerLinkGroup.svelte';

	const D = {
		Group: DrawerLinkGroup,
		Link: DrawerLink,
		Icon: DrawerLinkIcon,
		Text: DrawerLinkText
	};
</script>

<section class="list-nav flex h-full w-full flex-col p-4">
	<DrawerLinkGroup margin="mb-auto"><slot name="lead" {D} /></DrawerLinkGroup>
	<DrawerLinkGroup margin="mt-auto"><slot name="tail" {D} /></DrawerLinkGroup>
</section>
