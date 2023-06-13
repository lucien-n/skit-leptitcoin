<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<div class="w-full h-full flex items-center justify-center">
	<div class="w-1/4">
		<Auth
			supabaseClient={data.supabase}
			appearance={{ theme: ThemeSupa }}
			providers={['google', 'facebook']}
			theme={'dark'}
			additionalData={{}}
		/>
	</div>
</div>
