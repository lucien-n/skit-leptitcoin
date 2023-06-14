<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';

	let showPassword: boolean = false;

	$: email = '';
	$: password = '';
	$: username = '';

	async function signUp() {
		try {
			const {
				data: { user },
			} = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						username: username,
					},
				},
			});

			console.group('Sign Up');
			console.log(user);
			console.log(await supabase.auth.getSession());
			console.log(await supabase.auth.getUser());
			console.groupEnd();
		} catch (error) {
			console.error(error);
		}

		// If use connected
		if (false)
			toastStore.trigger({
				message: 'Signed in!',
				background: 'variant-glass-success',
				autohide: true,
			});

		goto('/');
	}

	function handlePasswordChange(e: any) {
		if (e.target == null) return;
		password += e.target.value;
	}
</script>

<section
	id="signup"
	class="w-full h-full flex self-center items-center justify-center"
>
	<form class="flex flex-col gap-6 card w-full mx-2 p-5 md:w-2/3 lg:w-1/3">
		<p class="text-center">
			Already have an account? <a href="/auth/signin" class="anchor"
				>Sign In.</a
			>
		</p>
		<section>
			<label for="name">Name</label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				id="name"
				name="name"
				class="input"
				autofocus
				autocomplete="additional-name"
				required
				bind:value={username}
			/>
		</section>

		<section>
			<label for="email">Email</label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="email"
				id="email"
				name="email"
				class="input"
				autocomplete="email"
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
					required
					on:input={handlePasswordChange}
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

		<button
			type="button"
			on:click={signUp}
			class="btn variant-ghost-surface w-fit mx-auto">Sign Up</button
		>
	</form>
</section>
