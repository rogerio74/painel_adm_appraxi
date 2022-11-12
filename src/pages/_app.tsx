import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { ReactElement, ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router'

import { AuthProvider } from '../common/contexts/AuthContext'
import { ModalProvider } from '../common/contexts/ModalContext'
import '../common/styles/globals.scss'
import 'nprogress/nprogress.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])

  return (
    <AuthProvider>
      <ModalProvider>
        {getLayout(
          <>
            <ToastContainer />
            <Component {...pageProps} />
          </>
        )}
      </ModalProvider>
    </AuthProvider>
  )
}

export default MyApp
