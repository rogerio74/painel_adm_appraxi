import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiPhone, BiUser } from 'react-icons/bi'
import { FiUserPlus, FiUserX } from 'react-icons/fi'
import { HiOutlineIdentification, HiOutlineMail } from 'react-icons/hi'
import { IoIosMore } from 'react-icons/io'
import { LoadingAnimation } from '../../../../common/components/AnimationLoading'
import { ModalComponent } from '../../../../common/components/Modal'
import { Table } from '../../../../common/components/Table'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import { OptionsFono } from '../OptionFono'
import styles from './styles.module.scss'

export interface IFonos {
  id: string
  nome: string
  email: string
  cep: string
  cpf: string
  telefone: string
  isAdmin: boolean
  fotoPerfil: string
}
interface IData {
  data: IFonos
}
const ListFono: React.FC = () => {
  const [fonos, setFonos] = useState<IFonos[]>([])
  const { handleOpenModal } = useModal()
  const [dataFono, setDataFono] = useState({} as IFonos)
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(true)

  function getUser() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(colRef, where('isFono', '==', true))

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
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()

    return () => getUser()
  }, [])

  function getFonoTable(data: IFonos) {
    setDataFono(data)
    handleOpenModal()
  }

  const column = [
    { name: 'Nome', id: 'name' },
    { name: 'Email', id: 'email' },
    { name: 'Telefone', id: 'phone' },
    { name: 'CPF', id: 'cpf' },
    { name: 'Administrador', id: 'adm' },
    { name: 'Opções', id: 'more' }
  ]

  console.log(fonos)

  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>Fonoaudiólogos</h1>
      </header>
      {loading ? (
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
              <td className={styles.center}>
                {item.isAdmin ? (
                  <span>
                    <FiUserPlus /> Sim
                  </span>
                ) : (
                  <span>
                    <FiUserX /> Não
                  </span>
                )}
              </td>
              <td>
                <button
                  className={styles.button_more}
                  type="button"
                  onClick={() => getFonoTable(item)}
                >
                  <IoIosMore />
                </button>
              </td>
            </>
          )}
          keyExtractor={({ id }) => id}
          rows={fonos}
          columns={column}
        />
      )}
      <ModalComponent title="Opções do fonoaudiologo">
        <OptionsFono data={dataFono} />
      </ModalComponent>
    </div>
  )
}

export default ListFono
