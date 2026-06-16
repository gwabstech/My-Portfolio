import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import {
  getFirestore, collection, addDoc, onSnapshot,
  orderBy, query, serverTimestamp, limit,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDkge5g5B0wNzC_U9qs5HCdadgBpl4ni7Y',
  authDomain: 'my-portfolio-787cb.firebaseapp.com',
  projectId: 'my-portfolio-787cb',
  storageBucket: 'my-portfolio-787cb.firebasestorage.app',
  messagingSenderId: '204730955320',
  appId: '1:204730955320:web:aecc83bcb76b20a91c58cd',
  measurementId: 'G-HQQNMK9CTD',
}

export function reviewsPath(projectId) {
  return `/artifacts/${projectId}/public/data/reviews`
}

let app, db, auth
try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
} catch (e) {
  console.error('Failed to initialize Firebase:', e)
}

// Subscribe to the latest reviews. Returns an unsubscribe function (or no-op).
export function subscribeToReviews(onChange, max = 6) {
  if (!db || !auth) return () => {}
  let unsub = () => {}
  signInAnonymously(auth)
    .then(() => {
      const col = collection(db, reviewsPath(firebaseConfig.projectId))
      const q = query(col, orderBy('timestamp', 'desc'), limit(max))
      unsub = onSnapshot(q, (snap) => {
        onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      }, (err) => console.error('reviews listener error:', err))
    })
    .catch((e) => console.error('anon auth failed:', e))
  return () => unsub()
}

export async function addReview({ name, rating, message }) {
  if (!db) throw new Error('Firestore not initialized')
  const col = collection(db, reviewsPath(firebaseConfig.projectId))
  await addDoc(col, { name, rating, message, timestamp: serverTimestamp() })
}
