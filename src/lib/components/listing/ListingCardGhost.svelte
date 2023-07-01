<script>
	import { fade } from 'svelte/transition';
	import PlaceholderSvg from '../svgs/PlaceholderSvg.svelte';
</script>

<div out:fade={{ duration: 100 }} class="card relative w-full h-fit flex flex-col">
	<header class="w-full h-2/3">
		<div class="placeholder w-fullcover h-full rounded-t-[4px] animate-pulse">
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		</div>
	</header>
	<div
		class="h-1/3 flex flex-col justify-between group/listing-card gap-2 animate-pulse"
		aria-label="listing placeholder"
	>
		<div class="card-header gap-2 flex flex-col">
			<div class="flex justify-between w-full">
				<div class="placeholder w-28" />
				<div class="w-12 badge variant-ghost placeholder" />
			</div>
			<p class="placeholder w-full" />
			<p class="placeholder w-2/3" />
		</div>
		<div class="card-footer">
			<div class="flex flex-row justify-between opacity-70 italic">
				<div class="placeholder w-20" />
				<div class="placeholder w-32" />
			</div>
		</div>
	</div>
</div>
