import { collection, onSnapshot, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { LoadingAnimation } from '../../../../common/components/AnimationLoading'
import { Button } from '../../../../common/components/Button'
import { ModalComponent } from '../../../../common/components/Modal'
import { useModal } from '../../../../common/contexts/ModalContext'

import { db } from '../../../../common/services'
import { FormTask } from '../FormTask'
import styles from './styles.module.scss'

export interface ITask {
  id: string
  title: string
  tasks: {
    id: string
    title: string
  }[]
}

export const Task: React.FC = () => {
  const [task, setTask] = useState<ITask>({} as ITask)
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  function getTasks() {
    try {
      const colRef = collection(db, 'capture')
      const queryCollection = query(colRef)

      onSnapshot(queryCollection, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ITask[]

        setTask(data[0])
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTasks()

    return () => getTasks()
  }, [])

  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>Captura de vozes</h1>
        <Button onClick={() => push('capture/createTask')} title="Criar novo Fluxo" />
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.task}>
          <ul>
            {task.tasks ? (
              task.tasks.map((item) => <li key={item.id}>{item.title}</li>)
            ) : (
              <span>Sem tarefas</span>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
