/* eslint-disable react/jsx-no-constructed-context-values */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { db } from '../services'

interface Iuser {
  nome: string
  email: string
  isAdmin?: boolean
  isFono?: boolean
}
interface ILoginProps {
  email: string
  password: string
}
interface IProps {
  signIn: ({ email, password }: ILoginProps) => Promise<void>
  signOut: () => Promise<void>
  userDt: Iuser | null
  token: string | null
}
interface AuthContextProviderProps {
  children: ReactNode
}
const AuthContext = createContext({} as IProps)

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [userDt, setUserDt] = useState<Iuser | null>({} as Iuser)
  const [token, setToken] = useState<string | null>(null)
  const { push } = useRouter()

  async function getAdmin(id: string) {
    try {
      const docRef = doc(db, 'usuarios', id)
      const docSnap = await getDoc(docRef)
      const { isAdmin, isFono } = docSnap.data() as Iuser

      if (isAdmin && !isFono) {
        push('/dashboard')
      } else {
        console.log('Você não possui acesso ao sistema')
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  const signIn = async ({ email, password }: ILoginProps) => {
    const auth = getAuth()

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
  async function readToken() {
    const { '@Appraxi:token': appraxi_token } = parseCookies()

    setToken(appraxi_token)
    if (appraxi_token) {
      const token_decoded: Iuser = await jwt_decode(appraxi_token)

      console.log(token_decoded)
      setUserDt({
        nome: token_decoded.nome,
        email: token_decoded.email
      })
    } else {
      setUserDt(null)
    }
  }
  useEffect(() => {
    readToken()
  }, [])

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
