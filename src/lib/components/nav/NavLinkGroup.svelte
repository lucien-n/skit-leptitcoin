<script lang="ts">
	import NavLink from '$comp/nav/NavLink.svelte';
	import NavText from '$comp/nav/NavLinkText.svelte';
	import Icon from '$comp/widgets/Icon.svelte';

	const N = {
		Link: NavLink,
		Text: NavText,
		Icon: Icon
	};
</script>

<slot {N} />
