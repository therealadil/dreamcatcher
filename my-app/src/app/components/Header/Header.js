'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';
import './Header.css';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error);
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Unexpected error during logout:', error);
        }
    };

    const showLogoutButton = pathname === '/dashboard' || pathname === '/form';
    const showLoginButton = pathname === '/';

    return (
        <header className="header">
            <div className="header-content">
                <h1>🌙 DreamCatcher</h1>
                <div className="header-buttons">
                    {showLoginButton && (
                        <Link href="/sign-in" className="header-login-btn">
                            My Account
                        </Link>
                    )}
                    {showLogoutButton && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;