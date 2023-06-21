<script lang="ts">
	export let data: { message: string | undefined };
</script>

<section
	id="admin-dashboard"
	class="w-full h-full flex items-center justify-center"
>
	<h1>{data.message ? data.message : 'Admin Dashboard'}</h1>
</section>
