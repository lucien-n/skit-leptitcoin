import { initializeApp, credential, type ServiceAccount } from 'firebase-admin'

import * as serviceAccount from "../../secrets/serviceAccountKey.json"

export const admin = initializeApp({
    credential: credential.cert(serviceAccount as ServiceAccount)
})

export const admin_auth = admin.auth();