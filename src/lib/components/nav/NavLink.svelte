<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { settingsStore } from '$lib/store';

	export let cc: string = '';

	const dispatch = createEventDispatcher();

	export let href: string = '';
	export let aria_label: string = '';
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
