<script lang="ts">
	import type { SupaUser } from '$lib/types/supa_user';

	export let data: { user: SupaUser };

	const user = data.user;
</script>

<section
	id="user-profile-{user.uid}"
	class="w-full h-full flex items-center justify-center"
>
	<h1 class="h1">{user.username}</h1>
</section>
