import { writable, type Writable } from "svelte/store";
import type { FireListing } from "$lib/types/fire_listing";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, type User } from "firebase/auth";
import type { FireUserInfo } from "$lib/types/fire_user_info";
import { auth, fs } from "$lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const searchStore: Writable<SearchParams> = writable({})
export const listingsStore: Writable<FireListing[]> = writable([])

export const authStore: Writable<{ isLoading: boolean, currentUser: User | null, additionnalInfo: FireUserInfo }> = writable({
    isLoading: true,
    currentUser: null,
    additionnalInfo: { username: "unknown", role: -1 }
})

export const authHandlers = {
    signin: async (email: string, password: string) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        if (!userCredentials) return
        authHandlers.createSession()
    },
    signup: async (email: string, password: string) => {
        const user_credentials = await createUserWithEmailAndPassword(auth, email, password)
        if (!user_credentials) return;
        const additionnalInfo: FireUserInfo = {
            username: email.split('.')[0],
            role: 0
        }
        await setDoc(doc(fs, 'users', user_credentials.user.uid), additionnalInfo);
    },
    signOut: async () => {
        await signOut(auth)
    },
    createSession: async () => {
        if (!auth.currentUser) return;
        auth.currentUser.getIdToken()
            .then(async (idToken) => {
                fetch("http://localhost:5173/auth/session", {
                    "method": "POST",
                    "credentials": "include",
                    "body": JSON.stringify({
                        "idToken": idToken,
                    })
                });
            })
    },
    deleteSession: async () => {
        await fetch("http://localhost:5173/auth/session", {
            "method": "DELETE",
            "credentials": "include",
        });
    },
    resetPassword: async (email: string) => {
        if (!email) return
        await sendPasswordResetEmail(auth, email)
    },
    updateEmail: async (email: string) => {
        if (!auth.currentUser) return;
        await updateEmail(auth.currentUser, email)
    },
    updatePassword: async (password: string) => {
        if (!auth.currentUser) return;
        await updatePassword(auth.currentUser, password)
    }
}