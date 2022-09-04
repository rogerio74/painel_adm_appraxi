import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { FormEvent, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { v4 } from 'uuid'
import { AiFillDelete } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import { Button } from '../../../../common/components/Button'
import { Input } from '../../../../common/components/Input'
import { useModal } from '../../../../common/contexts/ModalContext'
import { auth, db } from '../../../../common/services'
import style from './styles.module.scss'
import { db_audio } from '../../../../common/services/firebase_licao'

const createAdminSchema = yup.object().shape({
  name: yup.string().required('Este campo é obrigatório')
})

interface IAdminProps {
  name: string
  password: string
  email: string
  telefone: string
  cpf: string
}

interface IInput {
  id: string
  title: string
  file: string
}

export const FormTask = () => {
  const { handleOpenModal } = useModal()
  const [formFields, setFormFields] = useState<IInput[]>([{ title: '', id: `1`, file: `` }])

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const data: any = [...formFields]

    data[index][event.target.name] = event.target.value
    setFormFields(data)
  }

  const addFields = () => {
    setFormFields((prev) => [
      ...prev,
      {
        id: v4(),
        title: ``,
        file: ``
      }
    ])
  }

  const removeFields = (index: number) => {
    if (formFields.length > 1) {
      const data = [...formFields]

      data.splice(index, 1)
      setFormFields(data)
    }
  }

  async function update() {
    try {
      const colRef = doc(db_audio, 'capture', `FuSynUdWxh72OGLn8mnX`)

      await updateDoc(colRef, {
        tasks: formFields
      })
    } catch (err) {
      console.log(err)
    } finally {
      handleOpenModal()
    }
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    update()
  }

  return (
    <form onSubmit={submit} className={style.form}>
      <header className={style.header}>
        <button type="button" onClick={addFields}>
          <FiPlus /> Adicionar campo
        </button>
      </header>
      {formFields.map((form, index) => {
        return (
          <div className={style.wrapper_input} key={form.id}>
            <Input
              required
              name="title"
              placeholder="Titulo"
              onChange={(event) => handleFormChange(event, index)}
              value={form.title}
            />

            <button type="button" onClick={() => removeFields(index)}>
              <AiFillDelete />
            </button>
          </div>
        )
      })}
      <div className={style.alert}> ⚠️ Essas tarefas irão substituir as atuais!!</div>
      <Button type="submit" title="Adicionar" />
    </form>
  )
}
