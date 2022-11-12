import { doc, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'
import { BiPhone, BiUser } from 'react-icons/bi'
import { HiOutlineIdentification, HiOutlineMail, HiOutlineUser } from 'react-icons/hi'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import { IFonos } from '../ListFono'
import styles from './styles.module.scss'

interface IOptionFono {
  data: IFonos
}

export const OptionsFono = ({ data }: IOptionFono) => {
  const { handleOpenModal } = useModal()

  async function update() {
    try {
      const colRef = doc(db, 'usuarios', data.id)

      await updateDoc(colRef, {
        isAdmin: !data.isAdmin
      })
    } catch (err) {
      console.log(err)
    } finally {
      handleOpenModal()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.fono}>
        {data.fotoPerfil ? <Image alt="perfil" src={data.fotoPerfil} /> : <HiOutlineUser />}
        <div className={styles.content}>
          <span>
            <BiUser />
            {data.nome}
          </span>
          <span>
            <HiOutlineMail /> {data.email}
          </span>
          <span>
            <BiPhone /> {data.telefone}
          </span>
          <span>
            <HiOutlineIdentification /> {data.cpf}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        {/*         <button type="button" onClick={changeActive}>
          Desativar
        </button> */}
        <button type="button" onClick={update}>
          {!data.isAdmin ? 'Tornar-lo(a) administrador(a)' : 'Remover-lo(a) como administrador(a)'}
        </button>
      </div>
    </div>
  )
}
