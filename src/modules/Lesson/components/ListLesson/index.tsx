import { collection, onSnapshot, query } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { ModalComponent } from '../../../../common/components/Modal'
import { useModal } from '../../../../common/contexts/ModalContext'
import { db } from '../../../../common/services'
import { CardLesson } from '../CardLesson'
import { FormLesson } from '../FormActivities'
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

export const ListLesson = () => {
  const [lesson, setLesson] = useState<ILesson[]>([])
  const { handleOpenModal } = useModal()

  useEffect(() => {
    const colRef = collection(db, 'licoes')
    const queryCollection = query(colRef)
    const subscribe = onSnapshot(queryCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ILesson[]

      setLesson(data)
    })

    return () => subscribe()
  }, [])

  const variants = {
    opacity: [0, 1],
    y: ['-100%', '0%']
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Lições</h2>
        <button onClick={handleOpenModal} type="button">
          Add Lição
        </button>
      </div>
      <motion.div animate={variants} className={styles.ListLesson}>
        {lesson.map((data) => (
          <CardLesson key={data.id} data={data} />
        ))}
      </motion.div>
      <ModalComponent title="Adicionar Lição">
        <FormLesson />
      </ModalComponent>
    </div>
  )
}
