import { isLoggedIn, userStore } from "$lib/store";
import { getAuth, signInWithEmailAndPassword, type User } from "firebase/auth";

export async function signInWithFirebase(email: string, password: string): Promise<User> {
    const user_credentials = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
    );


    userStore.set(user_credentials.user);
    if (user_credentials) {
        isLoggedIn.set(true);
    }

    user_credentials.user.getIdToken()
        .then(async (idToken) => {
            fetch("http://localhost:5173/auth/session", {
                "method": "POST",
                "credentials": "include",
                "body": JSON.stringify({
                    "idToken": idToken,
                })
            });
        })

    console.log("session")

    return user_credentials.user;
}