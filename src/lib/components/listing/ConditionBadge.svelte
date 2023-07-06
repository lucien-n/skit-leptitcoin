<script lang="ts">
	import { LISTING_CONDITIONS as listingConditions } from '$lib/helper';

	export let condition: number;

	let condition_text = listingConditions[condition];
</script>

<div class="badge variant-ghost-secondary w-fit text-sm">
	{condition_text}
</div>
