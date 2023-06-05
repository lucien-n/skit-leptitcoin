import { auth } from '$lib/firebase.js';
import { isLoggedIn, userStore } from '$lib/store.js';


auth.onAuthStateChanged(async (user) => {
    if (!user) {
        isLoggedIn.set(false);
        return
    }
    userStore.set(user);
    isLoggedIn.set(true);
})
