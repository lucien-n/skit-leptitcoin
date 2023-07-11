<script lang="ts">
	import NavText from '$lib/components/nav/NavLinkText.svelte';
	import NavIcon from '$lib/components/nav/NavLinkIcon.svelte';
	import NavLink from '$lib/components/nav/NavLink.svelte';

	const N = {
		Link: NavLink,
		Text: NavText,
		Icon: NavIcon
	};
</script>

<slot {N} />
