import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../../../../common/components/Button'
import { Input } from '../../../../common/components/Input'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import style from './styles.module.scss'

const createAdminSchema = yup.object().shape({
  titulo: yup.string().required('Titulo é obrigatório'),
  corpo: yup.string().required('Corpo é obrigatório'),
  nivel: yup.number().required('Nivel é obrigatório')
})

interface IAdminProps {
  corpo: string
  nivel: number
  titulo: string
}

export const FormLesson = () => {
  const { handleOpenModal } = useModal()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAdminProps>({
    resolver: yupResolver(createAdminSchema)
  })
  const storageData = useCallback(
    async (values: IAdminProps) => {
      try {
        await addDoc(collection(db, 'licoes'), {
          corpo: values.corpo,
          nivel: values.nivel,
          titulo: values.titulo
        })
        handleOpenModal()
      } catch (err) {
        console.log(err)
      }
    },
    [handleOpenModal]
  )

  const handleCreateAdmin: SubmitHandler<IAdminProps> = async (values) => {
    storageData(values)
  }

  return (
    <form onSubmit={handleSubmit(handleCreateAdmin)} className={style.form}>
      <Input
        label="Titulo"
        error={errors.titulo}
        {...register('titulo')}
        placeholder="Informe o nome..."
      />
      <Input
        label="Corpo"
        error={errors.corpo}
        {...register('corpo')}
        placeholder="Informe o corpo..."
      />
      <Input
        type="number"
        label="Nivel"
        min={1}
        error={errors.nivel}
        {...register('nivel')}
        placeholder="Informe o nível"
      />

      <Button type="submit" title="Adicionar" />
    </form>
  )
}
