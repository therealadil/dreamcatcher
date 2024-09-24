import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signIn({ email, password })
    if (error) console.log('Error logging in:', error.message)
}

return (
    <form onSubmit={handleLogin}>
     <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log In</button>
    </form>
  )
}
