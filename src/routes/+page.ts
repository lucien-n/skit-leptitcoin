import { auth } from '$lib/firebase.js';
import { isLoggedIn, userStore } from '$lib/store.js';


auth.onAuthStateChanged(async (user) => {
    console.log(auth.currentUser)
    if (!user) {
        userStore.set({});
        isLoggedIn.set(false);
        return
    }
    userStore.set(user);
    isLoggedIn.set(true);
})
