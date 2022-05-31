import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './styles.module.scss'

interface IActivities {
  corpo: string
  titulo: string
  video: string
}
interface ILesson {
  id: string
  corpo: string
  titulo: string
  atividades: IActivities[]
  nivel: number
}
interface IDataProps {
  data: ILesson
}

export const CardLesson = ({ data }: IDataProps) => {
  const { push } = useRouter()
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 'F')

    if (parseInt(randomColor, 16) < 9999999) {
      generateColor()
    }

    return `#${randomColor}`
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: generateColor() }} className={styles.card_illustration} />
      <div className={styles.card_details}>
        <h3>Detalhes</h3>
        <p>
          <b>Titulo: </b>
          {data.titulo}
        </p>
        <p>
          <b>descrição: </b>
          {data.corpo}
        </p>
        <p>
          <b>Nivel: </b>
          {data.nivel}
        </p>
        <Link href={{ pathname: '/licoes/atividades', query: { id: data.id, name: data.titulo } }}>
          <a>Atividades</a>
        </Link>
      </div>
    </div>
  )
}
