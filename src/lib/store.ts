import { writable, type Writable } from "svelte/store";
import type { User } from 'firebase/auth'
import type { FireListing } from "./types/fire_listing";
import type { FireUser } from "./types/fire_user";

export const searchStore: Writable<SearchParams> = writable({})
export const listingsStore: Writable<FireListing[]> = writable([])

export const userStore: Writable<FireUser> = writable()
export const isLoggedIn = writable(false)