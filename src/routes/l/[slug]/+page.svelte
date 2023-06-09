<script lang="ts">
	export let data: { listing_id: string };

	const listing_id = data.listing_id;
</script>

<section
	id="listing-{listing_id}"
	class="w-full h-full flex items-center justify-center"
>
	<h1>
		{listing_id}
	</h1>
</section>
