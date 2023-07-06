<script lang="ts">
	import { enhance } from '$app/forms';
	import EyeClosedSvg from '$lib/components/svgs/EyeClosedSvg.svelte';
	import EyeOpenedSvg from '$lib/components/svgs/EyeOpenedSvg.svelte';
	import { TITLE } from '$lib/helper.js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;

	let show_password: boolean = false;
	let loading = false;

	const handleSubmit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		loading = true;
		return async ({ update }: { update: any }) => {
			loading = false;
			update();
		};
	};
</script>

<svelte:head>
	<title>{TITLE} Sign Up</title>
	<meta
		name="description"
		content="SignUp on LePtitCoin in a few clicks. You will then be able to create, like and edit listings."
	/>
</svelte:head>

<section id="signup" class="flex h-full w-full items-center justify-center self-center">
	<form
		action="/auth/signup"
		method="post"
		class="card mx-2 flex w-full flex-col gap-6 p-5 md:w-2/3 lg:w-1/3"
		use:enhance={handleSubmit}
	>
		{#if form?.message}
			<p class="mx-auto text-error-500">{form.message}</p>
		{/if}
		<p class="text-center">
			Already have an account? <a href="/auth/signin" class="anchor">Sign In.</a>
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
					type={show_password ? 'text' : 'password'}
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
					on:click={() => (show_password = !show_password)}
				>
					{#if show_password}
						<EyeClosedSvg />
					{:else}
						<EyeOpenedSvg />
					{/if}
				</button>
			</div>
		</section>

		<button type="submit" class="btn variant-ghost-surface mx-auto w-fit" disabled={loading}
			>{loading ? 'Loading...' : 'Sign Up'}</button
		>
	</form>
</section>
