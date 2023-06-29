<script lang="ts">
  import ListingRow from "$lib/components/listing/ListingRow.svelte";
  import UserCard from "$lib/components/user/UserCard.svelte";
  import { TITLE } from "$lib/helper";
  import { userStore } from "$lib/store";
  import { getUserListings } from "$lib/supabase";
  import type { SupaListing } from "$lib/types/supa_listing";
  import type { SupaUser } from "$lib/types/supa_user";

  export let data: { user: SupaUser; anonymous: boolean };

  let { user, anonymous } = data;
  $: ({ user, anonymous } = data);

  const userListings = async (): Promise<SupaListing[]> => {
    let listings = await getUserListings(user.uid);
    return listings || [];
  };
</script>

<svelte:head>
  <title>{TITLE} User - {user.username}</title>
</svelte:head>

<section
  id="user-profile-{user.uid}"
  class="w-[70%] h-full flex flex-col m-4 mx-auto gap-4"
>
  <UserCard {user} {anonymous} />
  <br />
  {#await userListings()}
    <h1>
      Loading {$userStore?.id === user.uid ? "your" : `${user.username}'s`} listings
    </h1>
  {:then listings}
    {#each listings as listing}
      <ListingRow {listing} />
    {/each}
  {/await}
</section>
