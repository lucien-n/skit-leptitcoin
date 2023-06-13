import type { User } from "@supabase/supabase-js"

export type SupaUser = {
    user: User;
    username: string;
}