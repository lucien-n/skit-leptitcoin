<script lang="ts">
	export let data: { listing_uid: string };

	const listing_uid = data.listing_uid;
</script>

<section
	id="listing-{listing_uid}"
	class="w-full h-full flex items-center justify-center"
>
	<h1>
		{listing_uid}
	</h1>
</section>
