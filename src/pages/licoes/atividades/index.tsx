import React, { ReactElement } from 'react'
import { Layout } from '../../../common/components/Layout'
import Activities from '../../../modules/Lesson/Activities'

const Atividades = () => {
  return <Activities />
}

Atividades.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Atividades
