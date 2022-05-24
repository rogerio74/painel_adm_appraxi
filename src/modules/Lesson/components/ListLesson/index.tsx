import { collection, getDocs, query } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../common/services'
import { CardLesson } from '../CardLesson'
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

  async function getLesson() {
    try {
      const colRef = collection(db, 'licoes')
      const queryCollection = query(colRef)
      const querySnapshot = await getDocs(queryCollection)
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ILesson[]

      setLesson(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getLesson()
  }, [])
  const variants = {
    opacity: [0, 1],
    y: ['-100%', '0%']
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Lições</h2>
        <button type="button">Add</button>
      </div>
      <motion.div animate={variants} className={styles.ListLesson}>
        {lesson.map((data) => (
          <CardLesson key={data.id} data={data} />
        ))}
      </motion.div>
    </div>
  )
}
