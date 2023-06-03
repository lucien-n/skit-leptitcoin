import { writable, type Writable } from "svelte/store";
import type { ListingProp } from "$lib/types/listing";

export const searchStore: Writable<SearchParams> = writable({})
export const listingsStore: Writable<ListingProp[]> = writable([])

export const userStore = writable({})