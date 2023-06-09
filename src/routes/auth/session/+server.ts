import { admin_auth } from "$lib/firebase_admin";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
    const { idToken } = await request.json();

    const expiresIn = 60 * 60 * 24 * 1_000

    const sessionCookie = await admin_auth.createSessionCookie(idToken, { expiresIn })

    const options = { maxAge: expiresIn, httpOnly: true, path: "/" }

    cookies.set("session", sessionCookie, options)

    return json({ status: 200 }, { statusText: "success" })
}

export async function DELETE({ cookies }) {
    cookies.set("session", "deleted")
    cookies.delete("session")

    return json({ status: 200 }, { statusText: "success" })
}