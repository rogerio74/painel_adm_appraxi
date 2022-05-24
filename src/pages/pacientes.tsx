import { ReactElement } from 'react'
import { Layout } from '../common/components/Layout'
import { Patient } from '../modules/Patients'

const Paciente = () => {
  return <Patient />
}

Paciente.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Paciente
