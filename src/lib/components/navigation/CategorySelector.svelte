<script lang="ts">
	export let value: string = '';
</script>

<select id="category" name="category" class="select" bind:value>
	<option value="vehicles">Vehicles</option>
	<option value="fashion">Fashion</option>
	<option value="housing">Housing</option>
	<option value="multimedia">Multimedia</option>
	<option value="recreational">Recreational</option>
</select>
