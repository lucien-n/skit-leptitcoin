<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase.js';
	import closedEyeSvg from '$lib/assets/eye-closed.svg?raw';
	import openedEyeSvg from '$lib/assets/eye-opened.svg?raw';
	import { info, warn } from '$lib/helper';

	let showPassword: boolean = false;
	let formElement: HTMLFormElement;

	$: email = '';
	$: password = '';

	function handlePasswordChange(event: any) {
		if (event.target === null) return;
		password = event.target.value;
	}

	async function signIn(event: SubmitEvent) {
		event.preventDefault();

		if (!email) {
			warn('Please enter a valid email');
			return;
		}

		if (!password) {
			warn('Please enter a password');
			return;
		}

		info('All fields correct');

		formElement.submit();
	}
</script>

<section id="signin" class="w-full h-full flex md:items-center justify-center">
	<form
		action="/auth/signin"
		method="post"
		class="flex flex-col gap-6 card w-full mx-2 p-5 md:w-2/3 lg:w-1/3"
		bind:this={formElement}
	>
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
			type="submit"
			on:submit={signIn}
			aria-label="sign in"
			class="btn variant-ghost-surface w-fit mx-auto">Sign In</button
		>
	</form>
</section>
