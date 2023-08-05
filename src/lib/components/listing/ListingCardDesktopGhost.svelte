<script>
	import { fade } from 'svelte/transition';
</script>

<div out:fade={{ duration: 100 }} class="card hidden h-64 w-full md:flex">
	<section class="z-30 h-full w-1/3">
		<div
			class="aspect-[4/5] h-full w-full animate-pulse rounded-l-[4px] border border-r-0 border-b-surface-500 border-l-surface-500 border-t-surface-500 bg-surface-700 object-cover"
		>
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		</div>
	</section>
	<div
		class="group/listing-card flex h-full w-full animate-pulse flex-col justify-between gap-2"
		aria-label="listing placeholder"
	>
		<div class="card-header flex flex-col gap-2">
			<div class="flex w-full justify-between">
				<div class="placeholder h-7 w-36" />
				<div class="badge placeholder variant-ghost h-7 w-16" />
			</div>
			<p class="placeholder w-full" />
			<p class="placeholder w-2/3" />
		</div>
		<div class="card-footer">
			<div class="flex-rown flex gap-2 italic opacity-70">
				<div class="placeholder w-24" />
				<div class="placeholder w-16" />
				<div class="placeholder w-28" />
			</div>
		</div>
	</div>
</div>
