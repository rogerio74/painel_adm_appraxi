/* eslint-disable jsx-a11y/media-has-caption */
import { collection, getDocs, query as q } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { ModalComponent } from '../../../../../common/components/Modal'
import { useModal } from '../../../../../common/contexts/ModalContext'
import { db } from '../../../../../common/services'
import { FormActivities } from '../FormActivities'
import styles from './styles.module.scss'

interface Iqy {
  corpo: string
  id: string
  thumb: string
  titulo: string
  video: string
}

export const ListActivities = () => {
  const { query } = useRouter()
  const [lesson, setLesson] = useState<Iqy[]>([])
  const { handleOpenModal } = useModal()

  const getLesson = useCallback(async () => {
    try {
      if (!query.id) return
      const colRef = collection(db, 'licoes', query.id.toString(), 'atividades')
      const queryCollection = q(colRef)
      const querySnapshot = await getDocs(queryCollection)

      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as Iqy[]

      setLesson(data)
    } catch (err) {
      console.log(err)
    }
  }, [setLesson, query.id])

  useEffect(() => {
    getLesson()
  }, [getLesson])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{query.name}</h3>
        <button type="button" onClick={() => handleOpenModal()}>
          Add Atividades
        </button>
      </div>
      {lesson.map((item, index) => (
        <details key={item.id}>
          <summary>
            {index} - {item.titulo}
          </summary>
          <ul>
            <li>
              <strong>Descrição: </strong>
              {item.corpo}
            </li>
          </ul>
        </details>
      ))}
      <ModalComponent title="Adicionar atividade">
        <FormActivities id={query.id?.toString()} />
      </ModalComponent>
    </div>
  )
}
