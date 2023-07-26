<script lang="ts">
	import { enhance } from '$app/forms';
	import { LISTING_CATEGORIES, LISTING_CONDITIONS, TITLE } from '$lib/helper';
	import { profileStore } from '$lib/store.js';
	import { supabase } from '$supa/supabase.js';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;

	let condition: number;

	let loading = false;
	let picture;

	const handleSubmit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		loading = true;
		formData.set('picture', picture);
		return async ({ update }: { update: any }) => {
			loading = false;
			update();

			// Upload picture
			if (form?.listing_uid) {
				const path = `${$profileStore.uid}/${form.listing_uid}.jpg`;
				console.log(path);
				const { data, error } = await supabase.storage
					.from('listings_pictures')
					.upload(path, picture);
				if (error) console.warn(error);
			}
		};
	};

	const handlePicture = (event) => {
		picture = event.target.files[0];
	};
</script>

<svelte:head>
	<title>{TITLE} New</title>
	<meta
		name="description"
		content="Create a new listing of any category. Your listing will need to be validated by a moderator before being public."
	/>
</svelte:head>
<div class="flex h-full w-full justify-center md:items-center">
	<form
		action="?/new"
		method="POST"
		class="card m-4 flex h-fit w-full flex-col gap-6 p-5 md:m-0 md:w-1/2"
		id="new-listing"
		use:enhance={handleSubmit}
	>
		{#if form?.message}
			<p class="mx-auto font-bold text-error-500">{form.message}</p>
		{/if}
		<section>
			<label for="title" class="flex gap-1"
				>Title <p class="text-xl text-error-500">
					{form?.subject === 'title' ? '*' : ''}
				</p></label
			>
			<input
				type="text"
				id="title"
				name="title"
				class="input"
				value={form?.title || ''}
				required
				maxlength="80"
				minlength="3"
			/>
		</section>
		<section>
			<label for="description" class="flex gap-1"
				>Description <p class="text-xl text-error-500">
					{form?.subject === 'description' ? '*' : ''}
				</p></label
			>
			<textarea
				name="description"
				id="description"
				rows="5"
				class="textarea"
				required
				value={form?.description || ''}
			/>
		</section>
		<section>
			<label for="price" class="flex gap-1"
				>Price (€) <p class="text-xl text-error-500">
					{form?.subject === 'price' ? '*' : ''}
				</p></label
			>
			<input type="number" id="price" name="price" class="input" value={form?.price || ''} />
		</section>
		<section>
			<label for="category">Category</label>
			<select id="category" name="category" class="select" value={form?.category || ''}>
				{#each LISTING_CATEGORIES as category}
					<option value={category.charAt(0).toUpperCase() + category.slice(1)}>{category}</option>
				{/each}
			</select>
		</section>
		<section class="mx-auto flex">
			<RadioGroup>
				{#each LISTING_CONDITIONS as state, i}
					<RadioItem bind:group={condition} value={i} name="listing_condition">
						{state}
					</RadioItem>
				{/each}
			</RadioGroup>
		</section>
		<section class="mx-auto flex">
			<p class="text-xl text-error-500">
				{form?.subject === 'picture' ? '*' : ''}
			</p>
			<input
				type="file"
				name="picture"
				id="picture"
				alt="listing miniature"
				accept=".png,.jpg,.jpeg"
				class="btn variant-ghost-surface hover:cursor-pointer"
				on:change={handlePicture}
			/>
		</section>
		<button
			type="submit"
			id="submit"
			class="btn variant-ghost-surface mx-auto w-fit"
			disabled={loading}>{loading ? 'Creating... ' : 'Create'}</button
		>
	</form>
</div>
