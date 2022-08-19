import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiPhone, BiUser } from 'react-icons/bi'
import { HiOutlineIdentification, HiOutlineMail } from 'react-icons/hi'
import { LoadingAnimation } from '../../../../common/components/AnimationLoading'
import { ModalComponent } from '../../../../common/components/Modal'
import { Table } from '../../../../common/components/Table'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import { FormAdmin } from '../FormAdmin'
import styles from './styles.module.scss'

interface IAdmin {
  id: string
  nome: string
  email: string
  cep: string
  cpf: string
  telefone: string
}

export const ListAdmins = () => {
  const [admins, setAdmins] = useState<IAdmin[]>([])
  const { handleOpenModal } = useModal()
  const [isLoading, setIsLoading] = useState(true)

  function queryAdmins() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(
        colRef,
        where('isAdmin', '==', true),
        where('isFono', '==', false)
      )

      onSnapshot(queryCollection, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as IAdmin[]

        setAdmins(data)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    queryAdmins()

    return () => queryAdmins()
  }, [])
  const column = [
    { name: 'Nome', id: 'name' },
    { name: 'Email', id: 'email' },
    { name: 'Telefone', id: 'phone' },
    { name: 'CPF', id: 'cpf' }
  ]

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <h1>Administradores</h1>
          <button onClick={handleOpenModal} type="button">
            Add Adm
          </button>
        </div>
      </header>
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
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
          rows={admins}
          columns={column}
        />
      )}
      <ModalComponent title="Adicionar Administrador">
        <FormAdmin />
      </ModalComponent>
    </div>
  )
}
