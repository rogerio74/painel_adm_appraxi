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

interface IFonos {
  id: string
  nome: string
  email: string
  cep: string
  cpf: string
  telefone: string
}

export const ListAdmins = () => {
  const [fonos, setFonos] = useState<IFonos[]>([])
  const { handleOpenModal } = useModal()
  const [isLoading, setIsLoading] = useState(true)

  function getUser() {
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
        }) as IFonos[]

        setFonos(data)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser()

    return () => getUser()
  }, [])
  const column = [
    { name: 'Nome', id: 'name' },
    { name: 'Email', id: 'email' },
    { name: 'Telefone', id: 'phone' },
    { name: 'CPF', id: 'cpf' }
  ]
  const variants = {
    opacity: [0, 1],
    x: ['100%', '0%']
  }

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
          rows={fonos}
          columns={column}
        />
      )}
      <ModalComponent title="Adicionar Administrador">
        <FormAdmin />
      </ModalComponent>
    </div>
  )
}
