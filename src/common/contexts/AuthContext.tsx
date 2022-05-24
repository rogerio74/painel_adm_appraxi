/* eslint-disable react/jsx-no-constructed-context-values */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'
import { db } from '../services'

interface Iuser {
  nome: string
  email: string
  isAdmin?: boolean
}
interface ILoginProps {
  email: string
  password: string
}
interface IProps {
  signIn: ({ email, password }: ILoginProps) => Promise<void>
  signOut: () => Promise<void>
  userDt: Iuser
  token: string | null
}
interface AuthContextProviderProps {
  children: ReactNode
}
const AuthContext = createContext({} as IProps)

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [userDt, setUserDt] = useState<Iuser>({} as Iuser)
  const [token, setToken] = useState<string | null>(null)
  const { push } = useRouter()

  async function getAdmin(id: string) {
    try {
      const docRef = doc(db, 'usuarios', id)
      const docSnap = await getDoc(docRef)
      const { isAdmin } = docSnap.data() as Iuser

      if (isAdmin) {
        push('/dashboard')
      } else {
        console.log('Você não possui acesso ao sistema')
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  const auth = getAuth()
  const signIn = async ({ email, password }: ILoginProps) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const data = response.user

      setToken(data.refreshToken)
      getAdmin(data.uid)
      setUserDt({
        email: data.email!,
        nome: data.displayName!
      })
      localStorage.setItem('@Appraxi:token', data.refreshToken)
    } catch (err) {
      console.log(err)
    }
  }

  async function signOut() {
    try {
      localStorage.removeItem('@Appraxi:token')
      push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        token,
        signOut,
        userDt
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider }
