<script lang="ts">
	import NavigationText from '$lib/components/navigation/NavigationText.svelte';
	import NavigationIcon from '$lib/components/navigation/NavigationIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { settingsStore } from '$lib/store';

	export let cc: string = '';

	const dispatch = createEventDispatcher();

	const N = {
		Text: NavigationText,
		Icon: NavigationIcon
	};

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
	<slot {N} />
</a>
