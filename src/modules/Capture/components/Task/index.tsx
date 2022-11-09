import { arrayRemove, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'

import { LoadingAnimation } from '../../../../common/components/AnimationLoading'
import { Button } from '../../../../common/components/Button'
import { Layout } from '../../../../common/components/Layout'
import { ModalComponent } from '../../../../common/components/Modal'
import { useModal } from '../../../../common/contexts/ModalContext'

import { db_audio } from '../../../../common/services/firebase_licao'
import { DetailsTask } from './details_task.tsx'
import styles from './styles.module.scss'

export interface ITask {
  id: string
  title: string
  tasks: word[]
}
export interface word{
  id: string
  title: string
  file: string
}
export const Task = () => {
  const [task, setTask] = useState<ITask>({} as ITask)
  const [detailsTask, setDetailsTask] = useState<word>({} as word)
  const [loading, setLoading] = useState(true)
  const { push, query: q } = useRouter()
  const {handleOpenModal} = useModal()
  
  function getTasks() {
    try {
      const colRef = collection(db_audio, 'cache')
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
  async function remove(task: word) {
    try {
      const colRef = doc(db_audio, 'cache', `${q.id}`)

      await updateDoc(colRef, {
        tasks: arrayRemove(task)
      })
      console.log('here')
    } catch (err) {
      console.log(err)
    }
  }
  function showDetails(word: word){
    handleOpenModal()
    setDetailsTask(word)
  }
  
  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>{task.title}</h1>
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
          
          <ul>
            {task.tasks ? (
              task.tasks.map((item) => <li key={item.id}>{item.title}<button onClick={()=>remove(item)}>remove</button> <button onClick={()=>showDetails(item)}>Detalhes</button></li>)
            ) : (
              <span>Sem tarefas</span>
            )}
          </ul>
          <div style={{width: '200px'}}>
          <Button onClick={() => push({pathname:'/capture/updateTask', query:{id: q.id}})} title="Adicionar novas palavras" />
          
          </div>
        </div>
      )}
     <ModalComponent title={detailsTask.title}>
        <DetailsTask data={detailsTask}/>
     </ModalComponent>
    </div>
  )
}

Task.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
