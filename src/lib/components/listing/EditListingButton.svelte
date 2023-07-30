<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';

	export let listing_uid: string;
</script>

<a href="/edit/{listing_uid}" class="btn variant-glass-tertiary p-2" aria-label="edit">
	<Icon name="edit" />
</a>
