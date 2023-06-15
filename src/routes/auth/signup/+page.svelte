<script lang="ts">
	import { enhance } from '$app/forms';
	import closedEyeSvg from '$lib/assets/eye-closed.svg?raw';
	import openedEyeSvg from '$lib/assets/eye-opened.svg?raw';
	import type { SubmitFunction } from '@sveltejs/kit';

	let showPassword: boolean = false;
	let loading = false;

	$: email = '';
	$: password = '';
	$: username = '';

	function handlePasswordChange(e: any) {
		if (e.target == null) return;
		password += e.target.value;
	}

	const handleSubmit: SubmitFunction = ({
		formElement,
		formData,
		action,
		cancel,
		submitter,
	}) => {
		loading = true;
		return async ({ update }: { update: any }) => {
			loading = false;
			update();
		};
	};
</script>

<section
	id="signup"
	class="w-full h-full flex self-center items-center justify-center"
>
	<form
		action="/auth/signup"
		method="post"
		class="flex flex-col gap-6 card w-full mx-2 p-5 md:w-2/3 lg:w-1/3"
		use:enhance={handleSubmit}
	>
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
						{@html closedEyeSvg}
					{:else}
						{@html openedEyeSvg}
					{/if}
				</button>
			</div>
		</section>

		<button
			type="submit"
			class="btn variant-ghost-surface w-fit mx-auto"
			disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button
		>
	</form>
</section>
