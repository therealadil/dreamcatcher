"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

const Dashboard = () => {
  const [dreamEntries, setDreamEntries] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndDreamEntries = async () => {
      try {
        const { data: { user: userData }, error: userError } = await supabase.auth.getUser();

        if (userError || !userData) {
          console.error('Error fetching user data:', userError?.message);
          router.replace('/sign-in');
          return;
        }

        setUser(userData);

        const { data: dreamData, error: dreamError } = await supabase
          .from('dream_entries')
          .select('*')
          .eq('user_id', userData.id);

        if (dreamError) {
          console.error('Error fetching dream entries:', dreamError.message);
        } else {
          setDreamEntries(dreamData);
        }
      } catch (error) {
        console.error('Error fetching user and dream entries:', error.message);
      }
    };

    fetchUserAndDreamEntries();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {dreamEntries.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.entry}</p>
          <p>Created at: {entry.created_at}</p>
          <p>User ID: {entry.user_id}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;