"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import './page.css';

const SignIn = () => {
const router = useRouter();
const [loading, setLoading] = useState(false);
const [user, setUser] = useState(null);

useEffect(() => {
    const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
        router.replace('/dashboard');
    }
    };
    checkUser();
}, [router]);

const handleGoogleSignIn = async () => {
    try {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        },
    });

    if (error) {
        console.error('Error logging in:', error.message);
    }
    } catch (error) {
    console.error('Error logging in:', error.message);
    } finally {
    setLoading(false);
    }
};

if (user) {
    return null; // or a loading spinner
}
return (
    <div className="sign-in-page">
        <div className="sign-in-container">
            <h1>Sign in to 🌙 DreamCatcher</h1>
            <p className="sign-in-description">Access your dream journal now.</p>
            <button onClick={handleGoogleSignIn} className="sign-in-button" disabled={loading}>
                <img
                    src="https://img.icons8.com/?size=100&id=85834&format=png&color=FFFFFF"
                    alt="Google Icon"
                    style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} 
                />
                <span style={{ fontWeight: 'normal' }}>{loading ? 'Processing...' : 'Continue with Google'}</span>
            </button>
            <p className="terms">By signing in, you confirm your agreement of our terms of use.</p>
        </div> 
    </div>
);






};

export default SignIn;

