import type { Database } from '$lib/database.types';
import { Session, SupabaseClient, type User } from '@supabase/supabase-js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	type SupaListing = Database['public']['Tables']['listings']['Row'];
	type SupaProfile = Database['public']['Tables']['profiles']['Row'];

	declare namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getRole(user_uid: string): Promise<number>;
			isUserAllowed(level: number): Promise<boolean>;
			roles: {
				ADMIN: number;
			};
			getUser(): Promise<User | undefined>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
