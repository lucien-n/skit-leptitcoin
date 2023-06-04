import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from "$lib/firebase";

export async function POST({ request }) {
    try {
        const body = request.body;
        if (body === null) throw new Error('No body');

        const email = body['email'].toString()
        const password = body['password'].toString()

        const user = await signInWithEmailAndPassword(auth, email, password);

        return {
            status: 200,
            body: { message: "Login successful", user }
        }
    } catch (error) {
        return {
            status: 401,
            body: { message: "Login failed", error }
        }
    }
}