<script lang="ts">
  import ListingRow from "$lib/components/listing/ListingRow.svelte";
  import { getListings } from "$lib/supabase";

  export let data: { message: string | undefined };
</script>

<section
  id="admin-dashboard"
  class="w-full md:w-[70%] mt-4 h-full flex flex-col mx-auto"
>
  <h3 class="h3 mx-auto">
    {data.message ? data.message : "Admin Dashboard"}
  </h3>

  <div class="flex flex-col gap-2 mt-5">
    {#await getListings(15) then listings}
      {#if listings}
        {#each listings as listing}
          <ListingRow {listing} />
        {/each}
      {/if}
    {/await}
  </div>
</section>
