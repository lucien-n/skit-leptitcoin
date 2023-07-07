<script lang="ts">
	import EditSvg from '$lib/components/svgs/EditSvg.svelte';

	export let listing_uid: string;
</script>

<a href="/e/{listing_uid}" class="btn variant-glass-tertiary p-2" aria-label="edit">
	<EditSvg />
</a>
