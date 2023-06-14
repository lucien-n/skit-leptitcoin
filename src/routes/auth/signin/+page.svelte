<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase.js';
	import closedEyeSvg from '$lib/assets/eye-closed.svg?raw';
	import openedEyeSvg from '$lib/assets/eye-opened.svg?raw';
	import { redirect } from '@sveltejs/kit';
	import { toastStore } from '@skeletonlabs/skeleton';

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

		if (user) {
			goto('/');
		}
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
						{@html closedEyeSvg}
					{:else}
						{@html openedEyeSvg}
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
