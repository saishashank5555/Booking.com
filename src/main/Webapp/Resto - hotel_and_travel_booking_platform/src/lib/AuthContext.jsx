import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null); // { type: 'user' | 'partner', ...firebaseUser }

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      setUserState(JSON.parse(stored));
    }
  }, []);

  // Save user to localStorage on change
  const setUser = (user) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
