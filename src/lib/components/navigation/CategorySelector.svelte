<script lang="ts">
	export let value: string = '';
	export let tab_index: number = 0;
</script>

<select id="category" name="category" class="select" tabindex={tab_index} bind:value>
	<option value="vehicles">Vehicles</option>
	<option value="fashion">Fashion</option>
	<option value="housing">Housing</option>
	<option value="multimedia">Multimedia</option>
	<option value="recreational">Recreational</option>
</select>
