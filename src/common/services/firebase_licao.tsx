import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig2 = {
  apiKey: 'AIzaSyDNNgEO8OCi2GJyNob-C14FC-KlzfFJSMc',
  authDomain: 'captura-vozes.firebaseapp.com',
  projectId: 'captura-vozes',
  storageBucket: 'captura-vozes.appspot.com',
  messagingSenderId: '36551383721',
  appId: '1:36551383721:web:cf86bc08e332c41895a7b8',
  measurementId: 'G-WDN7R7WC06'
}

const appAudio = initializeApp(firebaseConfig2, 'secondary')

const db_audio = getFirestore(appAudio)
const storage = getStorage(appAudio)

export { storage, db_audio }
