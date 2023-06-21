<script lang="ts">
	export let href: string;
</script>

<a class="flex items-center gap-1" {href}>
	<slot />
</a>
