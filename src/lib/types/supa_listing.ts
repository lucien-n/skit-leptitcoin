import type { SupaUser } from "./supa_user"

export type SupaListing = {
    uid: string,
    author_uid: string,
    title: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    state: number,
    author?: SupaUser
    createdAt?: number,
}