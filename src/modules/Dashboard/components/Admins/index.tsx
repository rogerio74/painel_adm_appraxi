import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiPhone, BiUser } from 'react-icons/bi'
import { HiOutlineIdentification, HiOutlineMail } from 'react-icons/hi'
import { ModalComponent } from '../../../../common/components/Modal'
import { Table } from '../../../../common/components/Table'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import { FormAdmin } from './FormAdmin'
import styles from './styles.module.scss'

interface IFonos {
  id: string
  nome: string
  email: string
  cep: string
  cpf: string
  telefone: string
}

export const Admins = () => {
  const [fonos, setFonos] = useState<IFonos[]>([])
  const { handleOpenModal } = useModal()

  useEffect(() => {
    const colRef = collection(db, 'usuarios')
    const queryCollection = query(colRef, where('isAdmin', '==', true))
    const subscribe = onSnapshot(queryCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as IFonos[]

      setFonos(data)
    })

    return () => subscribe()
  }, [])
  const column = [
    { name: 'Nome', id: 'name' },
    { name: 'Email', id: 'email' },
    { name: 'Telefone', id: 'phone' },
    { name: 'CPF', id: 'cpf' }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Administradores</h2>
        <button onClick={handleOpenModal} type="button">
          Add Adm
        </button>
      </div>
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
        rows={fonos}
        columns={column}
      />
      <ModalComponent title="Adicionar Administrador">
        <FormAdmin />
      </ModalComponent>
    </div>
  )
}
