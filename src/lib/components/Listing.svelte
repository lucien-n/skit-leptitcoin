<script lang="ts">
	import type { ListingProp } from '$lib/types/listing';
	import { formatDate } from '$lib/helper';

	export let listing: ListingProp;
</script>

<section id="listing-{listing.id}" class="card w-full h-full flex flex-col">
	<header>
		<img
			src={listing.images
				? listing.images[0]
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
				  listing.title.split(' ')[0]}
			alt="listing"
		/>
	</header>
	<div class="card-header">
		<div class="flex gap-2">
			<h1>{listing.title}</h1>
			<p class="opacity-80 italic">
				{listing.price} €
			</p>
		</div>
		<p>
			{listing.description}
		</p>
	</div>

	<div class="card-footer mt-auto">
		<div class="flex flex-row justify-between opacity-70 italic">
			<p>
				{listing.category}
			</p>
			<p>
				{listing.author_name} - {formatDate(listing.created_at)}
			</p>
		</div>
	</div>
</section>
