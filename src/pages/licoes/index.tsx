import React, { ReactElement } from 'react'
import { Layout } from '../../common/components/Layout'
import { Lesson } from '../../modules/Lesson'

const Licoes = () => {
  return <Lesson />
}

Licoes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Licoes
