<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';

	export let listing_uid: string;
</script>

<a href="/edit/{listing_uid}" class="btn variant-ghost-tertiary m-1 p-1" aria-label="edit">
	<Icon name="edit" />
</a>
