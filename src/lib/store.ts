import { writable, type Writable } from "svelte/store";
import type { ListingProp } from "$lib/types/listing";
import type { User } from 'firebase/auth'

export const searchStore: Writable<SearchParams> = writable({})
export const listingsStore: Writable<ListingProp[]> = writable([])

export const userStore: Writable<User> = writable()
export const isLoggedIn = writable(false)