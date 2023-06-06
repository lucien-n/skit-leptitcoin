import { auth } from '$lib/firebase.js';
import { isLoggedIn, userStore } from '$lib/store.js';
import type { User } from 'firebase/auth';


auth.onAuthStateChanged(async (user: User | null) => {
    if (!user) {
        isLoggedIn.set(false);
        return
    }
    userStore.set(user);
    isLoggedIn.set(true);
})
