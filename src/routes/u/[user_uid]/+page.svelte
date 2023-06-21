<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import type { SupaUser } from '$lib/types/supa_user';

	export let data: { user: SupaUser; anonymous: boolean };

	let { user, anonymous } = data;
	$: ({ user, anonymous } = data);
</script>

<section id="user-profile-{user.uid}" class="w-[70%] h-full flex m-4 mx-auto">
	<UserCard {user} {anonymous} showAnonymous={false} />
</section>
