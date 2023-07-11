<script lang="ts">
	import NavText from '$lib/components/nav/NavLinkText.svelte';
	import Icon from '$lib/components/widgets/Icon.svelte';
	import NavLink from '$lib/components/nav/NavLink.svelte';

	const N = {
		Link: NavLink,
		Text: NavText,
		Icon: Icon
	};
</script>

<slot {N} />
