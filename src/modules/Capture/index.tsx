import React, { ReactElement } from 'react'
import { Layout } from '../../common/components/Layout'
import { FormActivities } from './components/FormTask2'
import { Task } from './components/Task'

export const Capture = () => {
  return <Task />
}

Capture.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
