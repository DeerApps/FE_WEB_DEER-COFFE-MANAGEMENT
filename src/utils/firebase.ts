import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAd-ZegRgIwhfS3q0WeT60yEyLpgMupujM',
  authDomain: 'deer-coffee-4c661.firebaseapp.com',
  projectId: 'deer-coffee-4c661',
  storageBucket: 'deer-coffee-4c661.appspot.com',
  messagingSenderId: '772425790360',
  appId: '1:772425790360:web:51aa3afb3e903dbe5ef1ed'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
//https://www.youtube.com/watch?v=YOAeBSCkArA
//// 