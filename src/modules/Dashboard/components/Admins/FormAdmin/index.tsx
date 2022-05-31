import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../../../../../common/components/Button'
import { Input } from '../../../../../common/components/Input'
import { useModal } from '../../../../../common/contexts/ModalContext'
import { auth, db } from '../../../../../common/services'
import style from './styles.module.scss'

const createAdminSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('O formato do e-mail é inválido'),
  password: yup.string().required('Senha é obrigatória'),
  telefone: yup.string().required('telefone é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  name: yup.string().required('Nome é obrigatório')
})

interface IAdminProps {
  name: string
  password: string
  email: string
  telefone: string
  cpf: string
}

export const FormAdmin = () => {
  const { handleOpenModal } = useModal()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAdminProps>({
    resolver: yupResolver(createAdminSchema)
  })
  const storageData = useCallback(
    async (values: IAdminProps, id: string) => {
      try {
        await setDoc(doc(db, 'usuarios', id), {
          nome: values.name,
          email: values.email,
          telefone: values.telefone,
          cpf: values.cpf,
          isAdmin: true
        })
        handleOpenModal()
      } catch (err) {
        console.log(err)
      }
    },
    [handleOpenModal]
  )

  const handleCreateAdmin: SubmitHandler<IAdminProps> = async (values) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, values.email, values.password)

      storageData(values, data.user.uid)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateAdmin)} className={style.form}>
      <Input
        label="Nome"
        error={errors.name}
        {...register('name')}
        placeholder="Informe seu nome"
      />
      <Input
        label="Email"
        error={errors.email}
        {...register('email')}
        placeholder="Informe seu email"
      />
      <Input
        isPassword
        label="Senha"
        error={errors.password}
        {...register('password')}
        placeholder="Informe sua senha"
      />
      <Input
        label="Telefone"
        error={errors.telefone}
        {...register('telefone')}
        placeholder="Informe seu telefone"
      />
      <Input label="CPF" error={errors.cpf} {...register('cpf')} placeholder="Informe seu cpf" />

      <Button type="submit" title="Adicionar" />
    </form>
  )
}
