// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// import { useState } from 'react'
// import { supabase } from '../lib/supabase'

// export default function Login() {
// const [email, setEmail] = useState('')
// const [password, setPassword] = useState('')

// const handleLogin = async (e) => {
//     e.preventDefault()
//     const { error } = await supabase.auth.signIn({ email, password })
//     if (error) console.log('Error logging in:', error.message)
// }

// return (
//     <form onSubmit={handleLogin}>
//      <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Log In</button>
//     </form>
//   )
// }


/**
 * A React component that handles user sign-in and sign-up functionality using Supabase authentication.
 * 
 * The component checks if the user is already signed in, and if so, redirects them to the dashboard. Otherwise, it
 * renders a button that allows the user to sign in with their Google account.
 * 
 * The component uses the `supabase` client to handle the Google sign-in flow, and updates the component state
 * accordingly.
 */
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
    <div className ="sign-in-container">
    <h1>Sign In</h1>
    <button onClick={handleGoogleSignIn} className="sign-in-button" disabled={loading}>
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt="Google Logo"
        className="google-logo"
        />
        {loading ? 'Processing...' : 'Continue with Google'}
    </button>

    </div> 
);
};

export default SignIn;

