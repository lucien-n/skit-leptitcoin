<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TrashSvg from "../svgs/TrashSvg.svelte";

  export let listing_uid: string;
  export let index: number = 0;

  const dispatch = createEventDispatcher();

  const deleteListing = () => {
    fetch(`/d/${listing_uid}`);
    dispatch("click");
  };
</script>

<button
  on:click={deleteListing}
  class="variant-glass-error btn p-2"
  aria-label="delete"
  tabindex={index}
>
  <TrashSvg />
</button>
