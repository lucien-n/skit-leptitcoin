<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import StarFilledSvg from "$lib/components/svgs/StarFilledSvg.svelte";
  import StarSvg from "$lib/components/svgs/StarSvg.svelte";

  export let rating: number;
  export let ratedUserUid: string;
  export let ratingCount: number = 0;

  const dispatch = createEventDispatcher();

  const rate = async (i: number) => {
    rating = i + 1;
    dispatch("click");
    if (0 < rating && rating <= 5) fetch(`/u/${ratedUserUid}/rate/${rating}`);
  };
</script>

<section id="rating" class="flex">
  {#each { length: 5 } as _, i}
    <button on:click={() => rate(i)}>
      {#if rating > i}
        <StarFilledSvg />
      {:else}
        <StarSvg />
      {/if}
    </button>
  {/each}
  <p class="ml-1">
    {#if ratingCount > -1}
      ({ratingCount})
    {/if}
  </p>
</section>
