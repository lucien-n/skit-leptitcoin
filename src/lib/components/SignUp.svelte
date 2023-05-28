<script lang="ts">
	let showPassword: boolean = false;
</script>

<form
	class="flex flex-col gap-6 card p-5 w-1/4"
	action="/auth/signin"
	method="POST"
>
	<p class="text-center">
		Already have an account yet? <a href="/auth/signin" class="anchor"
			>Sign In.</a
		>
	</p>
	<section>
		<label for="email">Email</label>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="email"
			id="email"
			name="email"
			class="input"
			autofocus
			autocomplete="email"
			required
		/>
	</section>

	<section>
		<label for="password">Password</label>
		<div class="input-group flex flex-row">
			<input
				type={showPassword ? 'text' : 'password'}
				id="password"
				name="password"
				class="w-full"
				autocomplete="current-password"
				required
			/>
			<button
				type="button"
				aria-label="show password"
				on:click={() => (showPassword = !showPassword)}
			>
				{#if showPassword}
					<svg
						data-testid="geist-icon"
						fill="none"
						height="24"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="24"
						style="color:var(--geist-foreground)"
						><path
							d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
						/><path d="M1 1l22 22" /></svg
					>{:else}
					<svg
						data-testid="geist-icon"
						fill="none"
						height="24"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="24"
						style="color:var(--geist-foreground)"
						><path
							d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
						/><circle cx="12" cy="12" r="3" /></svg
					>
				{/if}
			</button>
		</div>
	</section>

	<button type="submit" class="btn variant-ghost-surface w-fit mx-auto"
		>Sign Up</button
	>
</form>
