'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
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

    return (
        <header className="header">
            <div className="header-content">
                <h1>🌙 DreamCatcher</h1>
                {showLogoutButton && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;