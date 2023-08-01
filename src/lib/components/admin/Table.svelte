<script lang="ts">
	import { setContext } from 'svelte';

	export let elements: object[];
	export let columns: string[];

	setContext('RowContext', {});
</script>

<table id="listings" class="w-full overflow-y-auto">
	<thead class="sticky top-0 bg-surface-900">
		<tr>
			{#each columns as col}
				<th class="p-2 text-left">{col}</th>
			{/each}
			<th class="">actions</th>
		</tr>
	</thead>
	<tbody>
		{#each elements as element}
			<tr class="even:bg-surface-700">
				{#await setContext('RowContext', element)}{/await}
				{#each columns as col, index}
					<td class="p-2">{element[col.toLowerCase()]}</td>
				{/each}
				<td class="text-center">
					<slot name="actions" />
				</td>
			</tr>
		{/each}
	</tbody>
</table>
