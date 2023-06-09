import type { FireUser } from "./fire_user";

export type FireListing = {
    id: string,
    author: FireUser,
    title: string,
    description: string,
    price: number,
    images?: string[],
    category: string,
    created_at: number,
}