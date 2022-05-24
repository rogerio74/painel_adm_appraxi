import React, { ReactElement } from 'react'
import { Layout } from '../common/components/Layout'
import { DashBoard } from '../modules/Dashboard'

function dashboard() {
  return <DashBoard />
}
dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default dashboard
