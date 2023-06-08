import { admin } from "$lib/firebase_admin"
import { getUser } from "$lib/firestore.js"
import { error } from "@sveltejs/kit"

export const load = async ({ params, cookies }) => {
    const sessionCookie = cookies.get("session")

    if (!sessionCookie) throw error(401, "Unauthorized")

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)

    const user_id = decodedClaims.uid

    const user = await getUser(user_id)
}