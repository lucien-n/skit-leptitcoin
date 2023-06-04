<script lang="ts">
	import type { ListingProp } from '$lib/types/listing';
	import { formatDate } from '$lib/helper';

	export let listing: ListingProp;
</script>

<section id="listing-{listing.id}" class="card w-full">
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
		<h1>{listing.title}</h1>
		<p>
			{listing.price} €
		</p>
	</div>

	<div class="card-footer">
		<p>
			{listing.description}
		</p>
		<div class="flex flex-row justify-between opacity-70 italic">
			<p>
				{listing.category}
			</p>
			<p>
				{listing.author_id} - {formatDate(listing.created_at)}
			</p>
		</div>
	</div>
</section>
