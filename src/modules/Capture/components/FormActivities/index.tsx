import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'
import { v4 } from 'uuid'
import { Button } from '../../../../common/components/Button'
import { Input } from '../../../../common/components/Input'
import { storage } from '../../../../common/services/firebase_licao'

import style from './styles.module.scss'

interface ITask {
  id: string
  title: string
  file: string
}
interface IFormActivitiesProps {
  setTasks: Dispatch<SetStateAction<ITask[]>>
  setName: Dispatch<SetStateAction<string>>
  name: string
  isUpdate: boolean
}

export const FormActivities = ({ setTasks, isUpdate, setName, name }: IFormActivitiesProps) => {
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const inputFileRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = React.useState(0)
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
        const progressFormatter = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        setLoading(true)
        setProgress(progressFormatter)
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
              title,
              id: v4().toString(),
              file: downloadURL
            }
          ])
          setLoading(false)
          setVideo(undefined)
          setTitle('')
          setVideo(undefined)
          if (inputFileRef.current !== null) {
            inputFileRef.current.value = ''
          }
        })
      }
    )
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      {!isUpdate && (
        <Input
          label="Nome da Lição"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Informe o titulo da lição"
        />
      )}
      <Input
        label="Nome da atividade"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Informe o nome da atividade"
      />

      <Input ref={inputFileRef} onChange={onFileChange} id="upload" type="file" label="Video" />

      <Button type="submit" title={loading ? `Enviando ${progress}%` : `Adicionar`} />
    </form>
  )
}
