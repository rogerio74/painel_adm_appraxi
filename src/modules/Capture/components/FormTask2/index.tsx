import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { v4 } from 'uuid'
import * as yup from 'yup'
import { Button } from '../../../../common/components/Button'
import { Input } from '../../../../common/components/Input'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db, storage } from '../../../../common/services'

import style from './styles.module.scss'

interface ITask {
  id: string
  title: string
  file: string
}
interface IFormActivitiesProps {
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

export const FormActivities = ({ setTasks }: IFormActivitiesProps) => {
  const [titulo, setTitulo] = useState('')
  const [video, setVideo] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const [p, setP] = React.useState(0)
  const onFileChange = async (e: FormEvent<HTMLInputElement>) => {
    const data = e.currentTarget.files![0]

    setVideo(data)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const videoref = ref(storage, `videos/${video?.name}`)

    if (!video) return

    setLoading(true)
    const uploadVideo = uploadBytesResumable(videoref, video)

    uploadVideo.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

        setLoading(true)
        setP(progress)
      },
      (error) => {
        alert(error)
        setLoading(false)
      },
      () => {
        getDownloadURL(uploadVideo.snapshot.ref).then((downloadURL) => {
          setTasks((prev) => [
            ...prev,
            {
              title: titulo,
              id: v4().toString(),
              file: downloadURL
            }
          ])
          setLoading(false)
          setVideo(undefined)
          setTitulo('')
        })
      }
    )
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <Input
        label="Titulo"
        onChange={(e) => setTitulo(e.target.value)}
        value={titulo}
        placeholder="Informe o titulo"
      />

      <Input onChange={onFileChange} id="upload" type="file" label="Video" />

      <Button type="submit" title={loading ? `Enviando ${p}%` : `Adicionar`} />
    </form>
  )
}
