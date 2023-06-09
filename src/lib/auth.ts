import { isLoggedIn, userStore } from "$lib/store";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, type User } from "firebase/auth";
import type { FireUser } from "$lib/types/fire_user";
import { doc, setDoc } from "firebase/firestore";
import { auth, fs } from "$lib/firebase";

export async function signInWithFirebase(email: string, password: string): Promise<User> {
    const user_credentials = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
    );

    const user = user_credentials.user
    const fireUser: FireUser = {
        fake: false,
        uid: user.uid,
        email: user.email || '',
        verified: user.emailVerified,
        username: 'Default',
        role: 0,
    };

    userStore.set(fireUser);
    if (user_credentials)
        isLoggedIn.set(true);
    createSession(user)

    return user;
}

export async function signUpWithFirebase(email: string, password: string): Promise<User> {
    const user_credentials = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
    );

    const user = user_credentials.user
    const now = new Date().getTime();
    const fireUser: FireUser = {
        fake: false,
        uid: user.uid,
        email: user.email || '',
        verified: user.emailVerified,
        username: 'Default',
        role: 0,
        created_at: now,
        updated_at: now,
    };
    setDoc(doc(fs, 'users', user.uid), fireUser);


    userStore.set(fireUser);
    if (user_credentials)
        isLoggedIn.set(true);
    createSession(user)

    return user
}

export function signOut() {
    deleteSession().then(() => auth.signOut())
}

export async function deleteSession() {
    await fetch("http://localhost:5173/auth/session", {
        "method": "DELETE",
        "credentials": "include",
    });
}

export async function createSession(user: User) {
    user.getIdToken()
        .then(async (idToken) => {
            fetch("http://localhost:5173/auth/session", {
                "method": "POST",
                "credentials": "include",
                "body": JSON.stringify({
                    "idToken": idToken,
                })
            });
        })
}