<script lang="ts">
  import { listingStates as listingConditions } from "$lib/helper";

  export let condition: number;

  let condition_text = listingConditions[condition];
</script>

<div class="w-fit badge text-sm variant-ghost-secondary">
  {condition_text}
</div>
