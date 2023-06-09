import adm from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin'
import * as serviceAccount from "../../secrets/serviceAccountKey.json"

const admin = adm.initializeApp({
    credential: adm.credential.cert(serviceAccount as ServiceAccount)
})

export const admin_auth = admin.auth();