<script lang="ts">
	import { TITLE, listingStates } from '$lib/helper';
	import { userStore } from '$lib/store';
	import { RadioGroup, RadioItem, toastStore } from '@skeletonlabs/skeleton';

	let formElement: HTMLFormElement;

	let title: string;
	let description: string;
	let price: number;
	let category: string;
	let listingState: number;

	async function postListing(event: SubmitEvent) {
		event.preventDefault();
		// If not user
		if (!$userStore) {
			toastStore.trigger({
				message: 'You must be logged in',
				background: 'bg-variant-error',
				autohide: true,
			});
			return;
		}

		if (title === undefined) {
			toastStore.trigger({
				message: 'Please enter a title',
			});
			return;
		}

		if (description === undefined) {
			toastStore.trigger({
				message: 'Please enter a description',
			});
			return;
		}

		if (price === undefined) {
			toastStore.trigger({
				message: 'Please enter a price',
			});
			return;
		}

		formElement.submit();
	}
</script>

<svelte:head>
	<title>{TITLE} New</title>
</svelte:head>
<div class="w-full h-full flex md:items-center justify-center">
	<form
		action="?/new"
		method="POST"
		class="flex flex-col card gap-6 w-full md:w-1/2 card p-5 h-fit m-4 md:m-0"
		id="new-listing"
		bind:this={formElement}
	>
		<section>
			<label for="title">Title</label>
			<input
				type="text"
				id="title"
				name="title"
				class="input"
				bind:value={title}
			/>
		</section>
		<section>
			<label for="description">Description</label>
			<textarea
				name="description"
				id="description"
				rows="5"
				class="textarea"
				bind:value={description}
			/>
		</section>
		<section>
			<label for="price">Price (€)</label>
			<input
				type="number"
				id="price"
				name="price"
				class="input"
				bind:value={price}
			/>
		</section>
		<section>
			<label for="category">Category</label>
			<select
				id="category"
				name="category"
				class="select"
				bind:value={category}
			>
				<option value="vehicles">Vehicles</option>
				<option value="fashion">Fashion</option>
				<option value="housing">Housing</option>
				<option value="multimedia">Multimedia</option>
				<option value="recreational">Recreational</option>
			</select>
		</section>
		<section>
			<RadioGroup>
				{#each listingStates as state, i}
					<RadioItem
						bind:group={listingState}
						value={i}
						name="listing_state"
					>
						{state}
					</RadioItem>
				{/each}
			</RadioGroup>
		</section>
		<button
			type="submit"
			on:submit={postListing}
			class="btn variant-ghost-surface w-fit mx-auto">Create</button
		>
	</form>
</div>
