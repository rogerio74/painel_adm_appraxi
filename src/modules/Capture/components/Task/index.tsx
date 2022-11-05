import { arrayRemove, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
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

export const Task: React.FC = () => {
  const [task, setTask] = useState<ITask>({} as ITask)
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
  async function remove(task: ITask) {
    try {
      const colRef = doc(db_audio, 'capture', `current_licao`)

      await updateDoc(colRef, {
        tasks: arrayRemove(task)
      })
      console.log('here')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>Novas Lições</h1>
        {task.id === null??
        <div>
        <button>Finalizar</button>
      <button>Deletar</button>

        </div>

        }
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.task}>
          <h2>
            {task.title}
          </h2>
          <ul>
            {task.tasks ? (
              task.tasks.map((item) => <li key={item.id}>{item.title}<button onClick={()=>remove(item)}>remove</button></li>)
            ) : (
              <span>Sem tarefas</span>
            )}
          </ul>
          <div style={{width: '200px'}}>
          <Button onClick={() => push('/capture/createTask')} title="Adicionar novas palavras" />

          </div>
        </div>
      )}
     
    </div>
  )
}