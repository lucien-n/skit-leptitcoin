<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let listing: SupaListing;
</script>

<section
	id="listing-{listing.uid}"
	class="w-full flex items-center justify-center"
>
	<div class="card">
		<header class="w-full h-2/3 overflow-hidden">
			<img
				src={listing.images
					? listing.images[0]
					: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
					  listing.title.split(' ')[0]}
				alt="listing"
				class="h-full w-full object-cover"
			/>
		</header>
		<div class="card-header">
			<h1 class="h1">{listing.title}</h1>
			<hr />
			<h3 class="h3">{listing.description}</h3>
		</div>
	</div>
</section>
