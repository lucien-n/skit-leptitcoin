<script>
	import { fade } from 'svelte/transition';
</script>

<div out:fade={{ duration: 100 }} class="card relative flex h-fit w-full flex-col">
	<header class="h-2/3 w-full">
		<div class="w-fullcover placeholder h-full animate-pulse rounded-t-[4px]">
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		</div>
	</header>
	<div
		class="group/listing-card flex h-1/3 animate-pulse flex-col justify-between gap-2"
		aria-label="listing placeholder"
	>
		<div class="card-header flex flex-col gap-2">
			<div class="flex w-full justify-between">
				<div class="placeholder w-28" />
				<div class="badge placeholder variant-ghost w-12" />
			</div>
			<p class="placeholder w-full" />
			<p class="placeholder w-2/3" />
		</div>
		<div class="card-footer">
			<div class="flex flex-row justify-between italic opacity-70">
				<div class="placeholder w-20" />
				<div class="placeholder w-32" />
			</div>
		</div>
	</div>
</div>
