import { app } from './firebaseConfig';

// Login for user or partner, with email or phone
export async function signInWithEmailOrPhone(identifier, password, userType = 'user') {
  const isEmail = /@/.test(identifier);
  let url = '';
  let body = {};

  if (userType === 'partner') {
    url = 'http://localhost:8080/hotel-owner/loginUsingEmailAndPassword';
    body = isEmail ? { email: identifier, password } : { phone: identifier, password };
  } else {
    // TODO: Update with your actual user login endpoint
    url = isEmail
      ? 'http://localhost:8080/user/loginUsingEmailAndPassword'
      : 'http://localhost:8080/user/loginUsingPhoneAndPassword';
    body = isEmail ? { email: identifier, password } : { phone: identifier, password };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}
