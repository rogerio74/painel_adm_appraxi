import React, { ReactElement } from 'react'
import { Layout } from '../../common/components/Layout'
import { Tasks } from './components/Tasks'

export const Capture = () => {
  return <Tasks />
}

Capture.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
