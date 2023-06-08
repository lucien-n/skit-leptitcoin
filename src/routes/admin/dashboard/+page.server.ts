import { admin_auth } from "$lib/firebase_admin"
import { getFireUser } from "$lib/firestore.js"
import { error } from "@sveltejs/kit"

export const load = async ({ params, cookies }) => {
    const sessionCookie = cookies.get("session")

    if (!sessionCookie) throw error(401, "Unauthorized")

    const decodedClaims = await admin_auth.verifySessionCookie(sessionCookie, true)

    const user_id = decodedClaims.uid

    const user = await getFireUser(user_id)

    if (!user || !(user.role > 0)) throw error(401, "Unauthorized");
}