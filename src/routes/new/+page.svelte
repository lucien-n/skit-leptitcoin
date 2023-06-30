<script lang="ts">
  import { enhance } from "$app/forms";
  import { TITLE, listingStates } from "$lib/helper";
  import { userStore } from "$lib/store";
  import { RadioGroup, RadioItem, toastStore } from "@skeletonlabs/skeleton";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let form;

  let title: string;
  let description: string;
  let price: number;
  let category: string;
  let condition: number;

  let loading = false;

  async function postListing(event: SubmitEvent) {
    event.preventDefault();

    if (!$userStore) {
      toastStore.trigger({
        message: "You must be logged in",
        background: "bg-variant-error",
        autohide: true,
      });
      return;
    }

    if (title === undefined) {
      toastStore.trigger({
        message: "Please enter a title",
      });
      return;
    }

    if (description === undefined) {
      toastStore.trigger({
        message: "Please enter a description",
      });
      return;
    }

    if (price === undefined) {
      toastStore.trigger({
        message: "Please enter a price",
      });
      return;
    }
  }

  const handleSubmit: SubmitFunction = ({
    formElement,
    formData,
    action,
    cancel,
    submitter,
  }) => {
    loading = true;
    return async ({ update }: { update: any }) => {
      loading = false;
      update();
    };
  };
</script>

<svelte:head>
  <title>{TITLE} New</title>
</svelte:head>
<div class="w-full h-full flex md:items-center justify-center">
  <form
    action="?/new"
    method="POST"
    class="flex flex-col card gap-6 w-full md:w-1/2 p-5 h-fit m-4 md:m-0"
    id="new-listing"
    use:enhance={handleSubmit}
  >
    {#if form?.message}
      <p class="mx-auto text-error-500 font-bold">{form.message}</p>
    {/if}
    <section>
      <label for="title" class="flex gap-1"
        >Title <p class="text-error-500 text-xl">
          {form?.subject === "title" ? "*" : ""}
        </p></label
      >
      <input
        type="text"
        id="title"
        name="title"
        class="input"
        value={form?.title || ""}
        required
        maxlength="80"
        minlength="3"
      />
    </section>
    <section>
      <label for="description" class="flex gap-1"
        >Description <p class="text-error-500 text-xl">
          {form?.subject === "description" ? "*" : ""}
        </p></label
      >
      <textarea
        name="description"
        id="description"
        rows="5"
        class="textarea"
        required
        value={form?.description || ""}
      />
    </section>
    <section>
      <label for="price" class="flex gap-1"
        >Price (€) <p class="text-error-500 text-xl">
          {form?.subject === "price" ? "*" : ""}
        </p></label
      >
      <input
        type="number"
        id="price"
        name="price"
        class="input"
        value={form?.price || ""}
      />
    </section>
    <section>
      <label for="category">Category</label>
      <select
        id="category"
        name="category"
        class="select"
        value={form?.category || ""}
      >
        <option value="vehicles">Vehicles</option>
        <option value="fashion">Fashion</option>
        <option value="housing">Housing</option>
        <option value="multimedia">Multimedia</option>
        <option value="recreational">Recreational</option>
      </select>
    </section>
    <section class="flex mx-auto">
      <RadioGroup>
        {#each listingStates as state, i}
          <RadioItem bind:group={condition} value={i} name="listing_condition">
            {state}
          </RadioItem>
        {/each}
      </RadioGroup>
    </section>
    <button
      type="submit"
      class="btn variant-ghost-surface w-fit mx-auto"
      disabled={loading}>{loading ? "Loading... " : "Create"}</button
    >
  </form>
</div>
