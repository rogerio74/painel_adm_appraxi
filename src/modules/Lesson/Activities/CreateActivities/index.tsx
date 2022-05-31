import { yupResolver } from '@hookform/resolvers/yup'
import { doc, setDoc } from 'firebase/firestore'
import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../../../../common/components/Button'
import { Input } from '../../../../common/components/Input'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import style from './styles.module.scss'

const createAdminSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('O formato do e-mail é inválido'),
  password: yup.string().required('Senha é obrigatória'),
  telefone: yup.string().required('telefone é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  name: yup.string().required('Nome é obrigatório')
})

interface IActivitiesProps {
  name: string
  password: string
  email: string
  telefone: string
  cpf: string
}

interface IFormActivitiesProps {
  id: string
}

export const FormActivities = ({ id }: IFormActivitiesProps) => {
  const { handleOpenModal } = useModal()
  const [fileUrl, setFileUrl] = useState<File>()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IActivitiesProps>({
    resolver: yupResolver(createAdminSchema)
  })

  const storageData = useCallback(
    async (values: IActivitiesProps, id_: string) => {
      try {
        await setDoc(doc(db, 'usuarios', id), {
          name: values.name,
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

  const handleCreateAdmin: SubmitHandler<IActivitiesProps> = async (values) => {
    try {
      console.log(values)
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
        type="file"
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
