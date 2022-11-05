import { collection, onSnapshot, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { LoadingAnimation } from '../../../../common/components/AnimationLoading'
import { Button } from '../../../../common/components/Button'

import { db_audio } from '../../../../common/services/firebase_licao'
import styles from './styles.module.scss'

export interface ITask {
  id: string
  title: string
  tasks: {
    id: string
    title: string
  }[]
}

export const Tasks: React.FC = () => {
  const [task, setTask] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  function getTasks() {
    try {
      const colRef = collection(db_audio, 'capture')
      const queryCollection = query(colRef)

      onSnapshot(queryCollection, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ITask[]

        console.log(data)

        setTask(data)
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
        <h1>Novas Lições</h1>
        <button>Add nova licao</button>
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.tasks}>
        
          <ul>
            {task ? (
              task.map((item) => 
              <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>Palavras{ item.tasks.length}</span>
                  <button onClick={()=>push('capture/task')}>editar</button>
                  <button>finalizar</button>
              </li>)
            ) : (
              <span>Sem tarefas</span>
            )}
          </ul>
          <div style={{width: '200px'}}>
          <Button onClick={() => push('capture/createTask')} title="Adicionar novas palavras" />

          </div>
        </div>
      )}
     
    </div>
  )
}
