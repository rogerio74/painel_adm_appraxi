import { ReactElement } from 'react'
import { Layout } from '../../common/components/Layout'
import { ListAdmins } from './components/ListAdmins'

export const Admins = () => {
  return <ListAdmins />
}
Admins.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
