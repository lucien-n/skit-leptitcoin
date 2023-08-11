<script lang="ts">
	export let as_card: boolean = true;
</script>

<div class="flex gap-3 hover:underline w-full md:w-fit" class:card={as_card} class:p-5={as_card}>
	<div class="placeholder-circle w-16 animate-pulse" />
	<div class="flex animate-pulse flex-col gap-2">
		<div class="placeholder w-32 self-center" />
		<div class="placeholder w-24" />
	</div>
</div>
