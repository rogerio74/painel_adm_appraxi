import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDZdZr6HKngMtKRjtLQZkWt62Y7AnzQLig',
  authDomain: 'apraxiaapp.firebaseapp.com',
  databaseURL: 'https://apraxiaapp-default-rtdb.firebaseio.com',
  projectId: 'apraxiaapp',
  storageBucket: 'apraxiaapp.appspot.com',
  messagingSenderId: '1081724332252',
  appId: '1:1081724332252:web:155b4f7bfc83fd150eec19'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }

