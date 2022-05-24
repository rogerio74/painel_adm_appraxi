import { collection, getDocs, query, where } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BiPhone, BiUser } from 'react-icons/bi'
import { HiOutlineIdentification, HiOutlineMail } from 'react-icons/hi'
import { Table } from '../../../../common/components/Table'
import { db } from '../../../../common/services'
import styles from './styles.module.scss'

interface IPatient {
  id: string
  nome: string
  email: string
  cep: string
  cpf: string
  telefone: string
}
const ListPatients: React.FC = () => {
  const [patients, setPatients] = useState<IPatient[]>([])
  const variants = {
    opacity: [0, 1],
    x: ['100%', '0%']
  }

  async function getPatients() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(colRef, where('isFono', '==', false))
      const querySnapshot = await getDocs(queryCollection)
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as IPatient[]

      setPatients(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getPatients()
  }, [])
  const column = [
    { name: 'Nome', id: 'name' },
    { name: 'Email', id: 'email' },
    { name: 'Telefone', id: 'phone' },
    { name: 'CPF', id: 'cpf' }
  ]

  return (
    <motion.div
      animate={variants}
      transition={{ duration: 0.5, type: 'tween' }}
      className={styles.container_list_users}
    >
      <h1>Pacientes</h1>
      <Table
        renderItem={(item) => (
          <>
            <td>
              <span>
                <BiUser />
                {item.nome}
              </span>
            </td>
            <td>
              <span>
                <HiOutlineMail />
                {item.email}
              </span>
            </td>
            <td>
              <span>
                <BiPhone />
                {item.telefone}
              </span>
            </td>
            <td>
              <span>
                <HiOutlineIdentification />
                {item.cpf}
              </span>
            </td>
          </>
        )}
        keyExtractor={({ id }) => id}
        rows={patients}
        columns={column}
      />
    </motion.div>
  )
}

export default ListPatients
