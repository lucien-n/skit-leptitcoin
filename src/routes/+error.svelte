<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center w-full h-full">
	<h2 class="h2">
		{$page.status}: {$page.error?.message}
	</h2>
</div>
