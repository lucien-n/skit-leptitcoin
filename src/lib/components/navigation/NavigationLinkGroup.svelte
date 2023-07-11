<script lang="ts">
	import NavigationText from '$lib/components/navigation/NavigationLinkText.svelte';
	import NavigationIcon from '$lib/components/navigation/NavigationLinkIcon.svelte';
	import NavigationLink from '$lib/components/navigation/NavigationLink.svelte';

	const N = {
		Link: NavigationLink,
		Text: NavigationText,
		Icon: NavigationIcon
	};
</script>

<slot {N} />
