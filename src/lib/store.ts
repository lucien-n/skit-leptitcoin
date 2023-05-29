import { writable, type Writable } from "svelte/store";

export const searchStore: Writable<SearchParams> = writable({})


interface SearchParams {
    search?: string,
    category?: string,
    price_min?: number,
    price_max?: number
}