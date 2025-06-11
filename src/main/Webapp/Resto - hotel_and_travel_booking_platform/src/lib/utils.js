import clsx from 'clsx';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from './firebaseConfig';

export function cn(...inputs) {
  return clsx(inputs);
}

export async function signInWithGoogle() {
  console.log('Initializing Google Sign-In...');
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  console.log('GoogleAuthProvider initialized:', provider);
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Google Sign-In Success:', result.user);
    return result.user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      console.error('The popup was closed before completing the sign-in.');
    } else if (error.code === 'auth/network-request-failed') {
      console.error('Network error occurred during sign-in.');
    } else {
      console.error('An unknown error occurred:', error.message);
    }
    throw error;
  }
}

export function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object');
  }
  return date.toLocaleDateString();
}

export function calculateDiscount(price, discount) {
  if (typeof price !== 'number') {
    throw new Error('Price must be a number');
  }
  if (typeof discount !== 'number') {
    throw new Error('Discount must be a number');
  }
  return price - price * (discount / 100);
}
