<script lang="ts">
	import { enhance } from '$app/forms';
	import EyeClosedSvg from '$lib/components/svgs/EyeClosedSvg.svelte';
	import EyeOpenedSvg from '$lib/components/svgs/EyeOpenedSvg.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

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

<section
	id="signup"
	class="w-full h-full flex self-center items-center justify-center"
>
	{#if form?.missing}
		<p>Please fill out all fields</p>
	{/if}

	<form
		action="/auth/signup"
		method="post"
		class="flex-col flex gap-6 card w-full mx-2 p-5 md:w-2/3 lg:w-1/3"
		use:enhance={handleSubmit}
	>
		<p class="text-center">
			Already have an account? <a href="/auth/signin" class="anchor"
				>Sign In.</a
			>
		</p>
		<section>
			<label for="username">Name</label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				id="username"
				name="username"
				class="input"
				autofocus
				autocomplete="additional-name"
				value={form?.username || ''}
				required
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
		</section>

		<button
			type="submit"
			class="btn variant-ghost-surface w-fit mx-auto"
			disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button
		>
	</form>
</section>
