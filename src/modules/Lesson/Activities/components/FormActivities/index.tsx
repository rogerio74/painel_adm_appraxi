import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { FormEvent, useState } from 'react'
import * as yup from 'yup'
import { Button } from '../../../../../common/components/Button'
import { Input } from '../../../../../common/components/Input'
import { useModal } from '../../../../../common/contexts/ModalContext'
import { db, storage } from '../../../../../common/services'
import style from './styles.module.scss'

const createAdminSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('O formato do e-mail é inválido'),
  password: yup.string().required('Senha é obrigatória'),
  telefone: yup.string().required('telefone é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  name: yup.string().required('Nome é obrigatório')
})

interface IActivitiesProps {
  corpo: string
  titulo: string
  video: string
}
interface IFormActivitiesProps {
  id: any
}

export const FormActivities = ({ id }: IFormActivitiesProps) => {
  const [corpo, setCorpo] = useState('')
  const [thumb, setThumb] = useState<File>()
  const [thumbUrl, setThumbUrl] = useState('')
  const [titulo, setTitulo] = useState('')
  const [video, setVideo] = useState<File>()
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { handleOpenModal } = useModal()

  const [p, setP] = React.useState(0)
  const onFileChange = async (e: FormEvent<HTMLInputElement>) => {
    const data = e.currentTarget.files![0]

    setVideo(data)
  }

  async function sendFirestore(x: string) {
    setLoading(true)
    try {
      await addDoc(collection(db, 'licoes', id, 'atividades'), {
        corpo,
        video: x,
        titulo
      })
      handleOpenModal()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const videoref = ref(storage, `videos/${video?.name}`)

    if (!video) return
    const uploadVideo = uploadBytesResumable(videoref, video)

    uploadVideo.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

        setP(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadVideo.snapshot.ref).then((downloadURL) => {
          sendFirestore(downloadURL)
        })
      }
    )
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <Input
        label="Titulo"
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Informe o titulo"
      />
      <Input
        label="Corpo"
        onChange={(e) => setCorpo(e.target.value)}
        placeholder="Informe a descrição"
      />
      <Input onChange={onFileChange} id="upload" type="file" label="Video" />

      <Button type="submit" title={!loading ? 'Adicionar' : `Enviando`} />
    </form>
  )
}
