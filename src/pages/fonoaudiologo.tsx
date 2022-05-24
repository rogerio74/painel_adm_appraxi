import React, { ReactElement } from 'react'
import { Layout } from '../common/components/Layout'
import { Fono } from '../modules/Fono'

const Fonoaudiologo = () => {
  return <Fono />
}

Fonoaudiologo.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Fonoaudiologo
