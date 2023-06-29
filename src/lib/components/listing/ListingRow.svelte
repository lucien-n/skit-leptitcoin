<script lang="ts">
  import { formatDate, listingStates } from "$lib/helper";
  import { userStore } from "$lib/store";
  import type { SupaListing } from "$lib/types/supa_listing";
  import EditButton from "../button/EditButton.svelte";
  import ConditionBadge from "./ConditionBadge.svelte";

  export let listing: SupaListing;

  const maxDescriptionLength: number = 30;
</script>

<a
  href="/l/{listing.uid}"
  class="card p-2 flex items-center justify-between group/listing-row"
>
  <div class="flex items-end gap-1 group-hover/listing-row:underline">
    <h4 class="h4">
      {listing.title}
    </h4>
    <p class="font-normal">
      {listing.description.length > maxDescriptionLength
        ? listing.description.slice(0, maxDescriptionLength) + "..."
        : listing.description}
    </p>
  </div>
  <div class="flex gap-2">
    <ConditionBadge condition={listing.condition} />
  </div>
  <div class="flex items-center gap-2">
    <p class="italic opacity-70">
      {formatDate(listing.createdAt || new Date().getTime())}
    </p>
    <div class="badge italic variant-ghost text-base">
      {listing.price} €
    </div>
    <!-- edit -->
    <div class:hidden={listing.author_uid !== $userStore?.id}>
      <EditButton listing_uid={listing.uid} />
    </div>
  </div>
</a>
