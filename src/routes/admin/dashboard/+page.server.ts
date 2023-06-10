import { admin_auth, admin_store } from "$lib/firebase_admin"
import { error } from "@sveltejs/kit"

export const load = async ({ params, cookies }) => {
    const sessionCookie = cookies.get("session")

    if (!sessionCookie) throw error(401, "Unauthorized")

    const decodedClaims = await admin_auth.verifySessionCookie(sessionCookie, true)

    const user_id = decodedClaims.uid

    const data = await admin_store.doc(`users/${user_id}`).get()

    if (!(data.get("role") > 0)) throw error(401, "Unauthorized");
}