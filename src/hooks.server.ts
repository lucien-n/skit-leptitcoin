import { supabase } from '$supa/supabase';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: 'https://zcxdsoyihrxxudqdnvwu.supabase.co',
		supabaseKey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k',
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.getRole = async (user_uid: string): Promise<number> => {
		try {
			const {
				data: [{ role }]
			} = await event.locals.supabase.from('profiles').select('role').eq('uid', user_uid);
			return parseInt(role);
		} catch (e) {
			console.warn(e);
		}
		return 0;
	};

	event.locals.isUserAllowed = async (level: number) => {
		const current_user = (await event.locals.getSession())?.user;
		if (!current_user) return false;

		const current_user_role = await event.locals.getRole(current_user.id);
		return current_user_role >= level;
	};

	event.locals.getProfile = async () => {
		const profile_uid = (await event.locals.getSession())?.user.id;
		const {
			data: [profile]
		} = await supabase.from('profiles').select('*').eq('uid', profile_uid);
		return profile;
	};

	event.locals.roles = {
		ADMIN: 8
	};

	if (event.url.pathname.split('/')[1] === 'api' && !(await event.locals.getSession())) {
		throw error(401, { message: 'Unauthorized' });
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
