import admin from 'firebase-admin'

const serviceAccount = require('../../secrets/serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin