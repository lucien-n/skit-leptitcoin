<script lang="ts">
	import Icon from '$lib/components/widgets/Icon.svelte';

	export let listing_uid: string;
</script>

<a href="/e/{listing_uid}" class="btn variant-glass-tertiary p-2" aria-label="edit">
	<Icon name="edit" />
</a>
