<script lang="ts">
  import EditSvg from "$lib/components/svgs/EditSvg.svelte";

  export let listing_uid: string;
  export let index: number = 0;
</script>

<a
  href="/e/{listing_uid}"
  class="variant-glass-tertiary btn p-2"
  aria-label="edit"
  tabindex={index}
>
  <EditSvg />
</a>
