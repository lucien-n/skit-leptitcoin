<script lang="ts">
	import CategorySelector from '$lib/components/CategorySelector.svelte';
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
			<input type="text" id="title" name="title" class="input" />
		</section>
		<section>
			<label for="description">Description</label>
			<textarea
				name="description"
				id="description"
				rows="5"
				class="textarea"
			/>
		</section>
		<section>
			<label for="price">Price (€)</label>
			<input type="number" id="price" name="price" class="input" />
		</section>
		<section>
			<label for="category">Category</label>

			<select id="category" name="category" class="select">
				<option value="vehicles">Vehicles</option>
				<option value="fashion">Fashion</option>
				<option value="housing">Housing</option>
				<option value="multimedia">Multimedia</option>
				<option value="recreational">Recreational</option>
			</select>
		</section>
		<button type="submit" class="btn variant-ghost-surface w-fit mx-auto"
			>Create</button
		>
	</form>
</div>
