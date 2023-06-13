<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SupaListing } from '$lib/types/supa_listing';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { v4 as uuid } from 'uuid';

	let title: string;
	let description: string;
	let price: number;
	let category: string;

	function postListing() {
		// If not user
		if (false) {
			toastStore.trigger({
				message: 'You must be logged in',
				background: 'bg-variant-error',
				autohide: true,
			});
			return;
		}

		if (
			title === undefined ||
			category === undefined ||
			price === undefined
		)
			return;

		const listing: SupaListing = {
			id: uuid(),
			author_uid: 'test-uuid',
			author_username: 'Someone',
			title: title,
			description: description,
			price: price,
			category: category,
			created_at: new Date().getTime(),
		};

		// TODOx²: post listing
		goto('/');
	}
</script>

<div class="w-full h-full flex md:items-center justify-center">
	<form
		action="?/new"
		method="POST"
		class="flex flex-col card gap-6 w-full md:w-1/2 card p-5 h-fit m-4 md:m-0"
		id="new-listing"
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
		<button
			type="button"
			on:click={postListing}
			class="btn variant-ghost-surface w-fit mx-auto">Create</button
		>
	</form>
</div>
