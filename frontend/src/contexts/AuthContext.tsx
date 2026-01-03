import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
    type User as FirebaseUser,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/config/firebase';
import type { User } from '@/types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔐 AuthProvider: initializing');

        // Check if auth is a valid Firebase Auth object (it should have app property)
        if (!auth || !(auth as any).app) {
            console.error('❌ AuthProvider: Firebase Auth is not initialized properly.');
            setLoading(false);
            return;
        }

        console.log('🔐 AuthProvider: setting up onAuthStateChanged');
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('👤 AuthProvider: auth state changed', firebaseUser ? 'user logged in' : 'no user');
            if (firebaseUser) {
                await handleUserData(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleUserData = async (firebaseUser: FirebaseUser) => {
        try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // User exists, get their data
                const userData = userSnap.data();
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    hasCompletedOnboarding: userData.hasCompletedOnboarding || false,
                });
            } else {
                // New user, create document
                const newUser: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    hasCompletedOnboarding: false,
                };

                await setDoc(userRef, {
                    ...newUser,
                    createdAt: new Date().toISOString(),
                });

                setUser(newUser);
            }
        } catch (error) {
            console.error('Error handling user data:', error);
            setUser(null);
        }
    };

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
