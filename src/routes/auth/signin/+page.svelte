<script lang="ts">
	import { enhance } from '$app/forms';
	import EyeClosedSvg from '$lib/components/svgs/EyeClosedSvg.svelte';
	import EyeOpenedSvg from '$lib/components/svgs/EyeOpenedSvg.svelte';
	import { TITLE } from '$lib/helper';
	import type { SubmitFunction } from './$types';

	export let form;

	let showPassword: boolean = false;
	let loading = false;

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

<svelte:head>
	<title>{TITLE} Sign In</title>
</svelte:head>
<section id="signin" class="w-full h-full flex md:items-center justify-center">
	{#if form?.missing}
		<p>Please fill out all fields</p>
	{/if}
	<form
		action="/auth/signin"
		method="post"
		class="flex flex-col gap-6 card w-full h-fit mt-3 md:mt-0 mx-2 p-5 md:w-2/3 lg:w-1/3"
		use:enhance={handleSubmit}
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
				value={form?.email || ''}
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
					aria-label="password"
					value={form?.password || ''}
					required
				/>
				<button
					type="button"
					aria-label="show password"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if showPassword}
						<EyeClosedSvg />
					{:else}
						<EyeOpenedSvg />
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
			aria-label="sign in"
			class="btn variant-ghost-surface w-fit mx-auto"
			disabled={loading}>{loading ? 'Loading... ' : 'Sign In'}</button
		>
	</form>
</section>
