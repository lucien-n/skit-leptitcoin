<script lang="ts">
	export let margin: string = '';
</script>

<ul class="flex flex-col gap-1 {margin}">
	<slot />
</ul>
