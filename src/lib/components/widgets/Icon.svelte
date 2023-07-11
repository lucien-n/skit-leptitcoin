<script lang="ts">
	import ArrowRightSvg from '../svgs/ArrowRightSvg.svelte';
	import CheckSvg from '../svgs/CheckSvg.svelte';
	import ChevronDownSvg from '../svgs/ChevronDownSvg.svelte';
	import ChevronUpSvg from '../svgs/ChevronUpSvg.svelte';
	import HomeSvg from '../svgs/HomeSvg.svelte';

	export let name: string;

	const icons = {
		home: HomeSvg,
		arrow_right: ArrowRightSvg,
		check: CheckSvg,
		chevron_down: ChevronDownSvg,
		chevron_up: ChevronUpSvg
	};
</script>
