// src/context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from'react'

export type UserRole = 'customer' | 'business'

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext<{
  role: UserRole
  setRole: (role: UserRole) => void
}>({
  role: 'customer',
  setRole: () => {},
})

export const UserProvider = ({ children }: UserProviderProps) => {
  const [role, setRoleState] = useState<UserRole>('customer')

  useEffect(() => {
    const storedRole = localStorage.getItem('user-role') as UserRole | null
    if (storedRole) setRoleState(storedRole)
  }, [])

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    localStorage.setItem('user-role', newRole)
  }

  return <UserContext.Provider value={{ role, setRole }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)