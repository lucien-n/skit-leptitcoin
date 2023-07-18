<script lang="ts">
	export let w: string | number = '12';
	export let h = '5';
	export let animate = 'pulse';
</script>

<div class="placeholder animate-{animate} w-{w} h-{h}" />
