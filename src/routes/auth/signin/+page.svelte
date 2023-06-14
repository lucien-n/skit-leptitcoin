<script lang="ts">
	import { supabase } from '$lib/supabase.js';

	$: email = '';
	$: password = '';
	let showPassword: boolean = false;

	function handlePasswordChange(event: any) {
		if (event.target === null) return;
		password = event.target.value;
	}

	async function signIn() {
		const {
			data: { user },
		} = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		console.group('Sign In');
		console.log(user);
		console.log(await supabase.auth.getSession());
		console.log(await supabase.auth.getUser());
		console.groupEnd();
	}
</script>

<section id="signin" class="w-full h-full flex md:items-center justify-center">
	<form class="flex flex-col gap-6 card w-full mx-2 p-5 md:w-2/3 lg:w-1/3">
		<p class="text-center">
			Don't have an account yet? <a
				href="/auth/signup"
				class="anchor"
				aria-label="create an account">Create one.</a
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
				aria-label="email"
				required
				bind:value={email}
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
					aria-label="password"
					required
					on:input={handlePasswordChange}
				/>
				<button
					type="button"
					aria-label="show password"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if showPassword}
						<img
							src="$statis/svgs/eye-closed.svg"
							alt="closed eye"
						/>
					{:else}
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
			<a
				href="/auth/forgot-password"
				class="anchor"
				aria-label="forgot password?">Forgot password ?</a
			>
		</section>

		<button
			type="button"
			on:click={signIn}
			aria-label="sign in"
			class="btn variant-ghost-surface w-fit mx-auto">Sign In</button
		>
	</form>
</section>
