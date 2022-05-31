import React, { ReactElement } from 'react'
import { Layout } from '../common/components/Layout'
import { Dashboard as Dash } from '../modules/Dashboard'

const Dashboard = () => {
  return <Dash />
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
