import { auth } from '$lib/firebase.js';
import { getFireUser } from '$lib/firestore';
import { isLoggedIn, userStore } from '$lib/store.js';
import type { User } from 'firebase/auth';


auth.onAuthStateChanged(async (user: User | null) => {
    if (!user) {
        isLoggedIn.set(false);
        return
    }
    userStore.set(await getFireUser(user.uid));
    isLoggedIn.set(true);
})
