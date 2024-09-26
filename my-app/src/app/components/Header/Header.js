// 'use client';

// import React from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { supabase } from '../../../lib/supabaseClient'; // Adjust this import path as needed
// import './Header.css';

// const Header = () => {
//     const router = useRouter();
//     const pathname = usePathname();

//     const handleLogout = async () => {
//         try {
//             const { error } = await supabase.auth.signOut();
//             if (error) {
//                 console.error('Error logging out:', error);
//             } else {
//                 router.push('/'); // Redirect to home page after logout
//             }
//         } catch (error) {
//             console.error('Unexpected error during logout:', error);
//         }
//     };

//     const isDashboardPage = pathname === '/dashboard'; // Adjust this path if your dashboard route is different

//     return (
//         <header className="header">
//             <h1>🌙 DreamCatcher</h1>
//             {isDashboardPage && (
//                 <button className='button' onClick={handleLogout}>Log out</button>
//             )}
//         </header>
//     );
// };

// export default Header;

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient'; // Adjust this import path as needed
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Example icon (log out)

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error);
            } else {
                router.push('/'); // Redirect to home page after logout
            }
        } catch (error) {
            console.error('Unexpected error during logout:', error);
        }
    };

    const showLogoutButton = pathname === '/dashboard' || pathname === '/form'; // Show button on both dashboard and form pages

    return (
        <header className="header">
            <h1>🌙 DreamCatcher</h1>
            {showLogoutButton && (
                <div className="button-container">
                    <button className="button" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </div>
            )}
        </header>
    );
    
};

export default Header;