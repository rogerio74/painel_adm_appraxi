import React, { ReactElement } from 'react'
import { Layout } from '../../common/components/Layout'
import { Task } from './components/Task'

export const Lesson = () => {
  return <Task />
}

Lesson.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
