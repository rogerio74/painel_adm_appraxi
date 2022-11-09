import { addDoc, deleteDoc, collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { LoadingAnimation } from '../../../../common/components/AnimationLoading'
import { Button } from '../../../../common/components/Button'

import { db_audio } from '../../../../common/services/firebase_licao'
import { ILesson } from '../../../Lessons/components/Task'
import styles from './styles.module.scss'

export interface ITask {
  id: string
  title: string
  tasks: {
    id: string
    title: string,
    file:string
  }[]
}

export const Tasks: React.FC = () => {
  const [task, setTask] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)
  const [lenghtLesson, setlenghtLesson] = useState(0)
  const { push } = useRouter()

  function getTasks() {
    try {
      const colRef = collection(db_audio, 'cache')
      const queryCollection = query(colRef)

      onSnapshot(queryCollection, (snapshot) => {
        const data = snapshot.docs.map((dc) => {
          return {
            id: dc.id,
            ...dc.data()
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
    getLessonLenght()
    return () => {getTasks(); getLessonLenght()}
  }, [])
  function getLessonLenght() {
    setLoading(true)
    try {
      const colRef = collection(db_audio, 'licoes')
      const queryCollection = query(colRef)

      onSnapshot(queryCollection, (snapshot) => {
        const data = snapshot.docs.map((dc) => {
          return {
            id: dc.id,
            ...dc.data()
          }
        }) as ILesson[]

        setlenghtLesson(data.length);
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  
  async function finesheLesson(my_task: ITask) {
    try {
      const ref = doc(db_audio, 'licoes', `${my_task.title}`)
      const palavras: any[] = []

      my_task.tasks.forEach((item) => {
        const { title } = item
        const { file } = item

        const v = { [title]: file }

        palavras.push(v)
      })
      const lesson = {
        bloqueada: false,
        contador_arquivos: 1,
        id: my_task.title,
        contador_pastas: 1,
        ordem: lenghtLesson.toString(),
        palavras: [...palavras]
      }

      await setDoc(ref, lesson)
      await removeLesson(my_task)
      push('/lessons')
    } catch (err) {
      console.log(err)
    }
  }
  async function removeLesson(task: ITask) {
    try {
      const ref = doc(db_audio,'cache', `${task.title}`)
    
      await deleteDoc(ref)

     
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>Novas Lições</h1>
        <button onClick={()=>push('/capture/createTask')}>Add nova licao</button>
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
                  <button onClick={()=>push({pathname: 'capture/task', query:{id: item.id}})}>editar</button>
                  <button onClick={()=>finesheLesson(item)}>finalizar</button>
              </li>)
            ) : (
              <span>Sem tarefas</span>
            )}
          </ul>
        
        </div>
      )}
     
    </div>
  )
}
