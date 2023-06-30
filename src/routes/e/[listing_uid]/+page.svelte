<script lang="ts">
  import { TITLE } from "$lib/helper";
  import type { SupaListing } from "$lib/types/supa_listing";

  export let data: { listing: SupaListing };

  let { listing } = data;
  $: ({ listing } = data);
</script>

<svelte:head>
  <title>{TITLE} Edit "{listing.title}"</title>
</svelte:head>

<div class="w-full h-full flex items-center justify-center">
  <h1>
    {listing.title}
  </h1>
</div>
