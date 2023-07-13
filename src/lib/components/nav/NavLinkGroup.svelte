<script lang="ts">
	import NavText from '$comp/nav/NavLinkText.svelte';
	import Icon from '$comp/widgets/Icon.svelte';
	import NavLink from '$comp/nav/NavLink.svelte';

	const N = {
		Link: NavLink,
		Text: NavText,
		Icon: Icon
	};
</script>

<slot {N} />
