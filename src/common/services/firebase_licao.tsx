import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const appAudio = initializeApp(firebaseConfig2, 'secondary')

const db_audio = getFirestore(appAudio)
const storage = getStorage(appAudio)

export { storage, db_audio }
