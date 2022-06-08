import React, { ReactElement } from 'react'
import { Layout } from '../../common/components/Layout'
import ListFono from './components/ListFono'

export const Fono = () => {
  return <ListFono />
}

Fono.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
