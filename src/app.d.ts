import { Session, SupabaseClient, type User } from '@supabase/supabase-js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
			getRole(user_uid: string): Promise<number>;
			isUserAllowed(level: number): Promise<boolean>;
			roles: {
				ADMIN: number;
			};
			currentUser: User | undefined;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
