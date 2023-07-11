<script lang="ts">
	export let w: string | number = '12';
	export let h: string = '5';
	export let animate: string = 'pulse';
</script>

<div class="placeholder animate-{animate} w-{w} h-{h}" />
