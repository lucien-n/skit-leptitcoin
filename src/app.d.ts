import { Session, SupabaseClient } from '@supabase/supabase-js'



// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			supabase: SupabaseClient
			getSession(): Promise<Session | null>
			getRole(user_uid: string): Promise<number>
			roles: {
				ADMIN: number
			}
		}
		interface PageData {
			session: Session | null
		}
		// interface Error {}
		// interface Platform {}
	}
}