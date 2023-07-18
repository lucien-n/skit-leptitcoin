<script lang="ts">
	import DrawerLink from '$comp/drawer/DrawerLink.svelte';
	import DrawerLinkText from '$comp/drawer/DrawerLinkText.svelte';
	import Icon from '$comp/widgets/Icon.svelte';
	import DrawerLinkGroup from './DrawerLinkGroup.svelte';

	const D = {
		Group: DrawerLinkGroup,
		Link: DrawerLink,
		Icon: Icon,
		Text: DrawerLinkText
	};
</script>

<section class="list-nav flex h-full w-full flex-col p-4">
	<DrawerLinkGroup margin="mb-auto"><slot name="lead" {D} /></DrawerLinkGroup>
	<DrawerLinkGroup margin="mt-auto"><slot name="tail" {D} /></DrawerLinkGroup>
</section>
