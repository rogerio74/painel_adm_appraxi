import { collection, deleteDoc, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'
import { RiDeleteBinFill } from 'react-icons/ri'

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
    title: string
    file: string
  }[]
}

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)
  const [lenghtLesson, setLengthLesson] = useState(0)
  const { push } = useRouter()

  function getTasksInCache() {
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

        setTasks(data)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTasksInCache()
    getLessonLength()

    return () => {
      getTasksInCache()
      getLessonLength()
    }
  }, [])
  function getLessonLength() {
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

        setLengthLesson(data.length)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  async function finishLesson(my_task: ITask) {
    try {
      const ref = doc(db_audio, 'licoes', `${my_task.title}`)
      const words: any[] = []

      my_task.tasks.forEach((item) => {
        const { title } = item
        const { file } = item

        const word = { [title]: file }

        words.push(word)
      })
      const lesson = {
        bloqueada: false,
        contador_arquivos: 1,
        id: my_task.title,
        contador_pastas: 1,
        ordem: lenghtLesson.toString(),
        palavras: [...words]
      }

      await setDoc(ref, lesson)
      await removeLesson(my_task)
      push('/lessons')
    } catch (err) {
      console.log(err)
    }
  }
  async function removeLesson(my_task: ITask) {
    try {
      const ref = doc(db_audio, 'cache', `${my_task.title}`)

      await deleteDoc(ref)
    } catch (err) {
      console.log(err)
    }
  }
  async function remove(my_task: ITask) {
    try {
      const colRef = doc(db_audio, 'cache', `${my_task.id}`)

      await deleteDoc(colRef)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>Novas Lições</h1>
        <Button title="Add Nova Lição" type="button" onClick={() => push('/capture/createTask')} />
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.tasks}>
          <ul>
            {tasks ? (
              tasks.map((item) => (
                <li key={item.id}>
                  <div className={styles.title_card}>
                    <h2>{item.title} </h2>
                    <button onClick={() => remove(item)} type="button">
                      <RiDeleteBinFill />
                    </button>
                  </div>
                  <strong>Atividades: {item.tasks.length}</strong>
                  <button
                    type="button"
                    onClick={() => push({ pathname: 'capture/task', query: { id: item.id } })}
                  >
                    <span>
                      <BiEdit />
                      Editar
                    </span>
                  </button>
                  <button type="button" onClick={() => finishLesson(item)}>
                    <span>
                      <MdDone />
                      Finalizar
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <span>Sem tarefas</span>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
