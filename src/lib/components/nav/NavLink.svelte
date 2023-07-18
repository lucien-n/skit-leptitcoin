<script lang="ts">
	import { settingsStore } from '$lib/store';
	import { createEventDispatcher } from 'svelte';

	export let cc = '';

	const dispatch = createEventDispatcher();

	export let href = '';
	export let aria_label = '';
</script>

<a
	{href}
	class="flex flex-col items-center rounded-[4px] p-1 px-2 {$settingsStore.high_contrast
		? 'hover:variant-ghost-success'
		: ''} {cc}"
	aria-label={aria_label}
	on:click={() => dispatch('click')}
>
	<slot />
</a>
