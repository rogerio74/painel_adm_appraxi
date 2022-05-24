import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../common/contexts/AuthContext'
import { ModalProvider } from '../common/contexts/ModalContext'
/* import { ModalProvider } from '../common/contexts/ModalContext'
 */ import '../common/styles/globals.scss'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AuthProvider>
      <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
      <ToastContainer />
    </AuthProvider>
  )
}

export default MyApp
