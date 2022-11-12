import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'

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
  tasks: Iword[]
}

export interface Iword {
  id: string
  title: string
  file: string
}

export const Task = () => {
  const [task, setTask] = useState<ITask>({} as ITask)
  const [detailsTask, setDetailsTask] = useState<Iword>({} as Iword)
  const [loading, setLoading] = useState(true)
  const { push, query: q } = useRouter()
  const { handleOpenModal } = useModal()

  const getTask = useCallback(async () => {
    try {
      const docRef = doc(db_audio, 'cache', `${q.id}`)
      const docSnap = await getDoc(docRef)
      const taskData = { id: docSnap.id, ...docSnap.data() }

      setTask(taskData as ITask)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [q.id])

  useEffect(() => {
    getTask()
  }, [task, getTask])
  async function remove(my_task: Iword) {
    try {
      const colRef = doc(db_audio, 'cache', `${q.id}`)

      await updateDoc(colRef, {
        tasks: arrayRemove(my_task)
      })
    } catch (err) {
      console.log(err)
    }
  }
  function showDetails(word: Iword) {
    handleOpenModal()
    setDetailsTask(word)
  }

  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>{task.title}</h1>

        <Button
          onClick={() => push({ pathname: '/capture/updateTask', query: { id: q.id } })}
          title="Add Novas Palavras"
        />
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.task}>
          <h2>Atividades:</h2>
          <ul>
            {task.tasks ? (
              task.tasks.map((item) => (
                <li key={item.id}>
                  <h2>{item.title}</h2>
                  <button type="button" onClick={() => remove(item)}>
                    <span>
                      <MdDeleteOutline /> Remover
                    </span>
                  </button>{' '}
                  <button type="button" onClick={() => showDetails(item)}>
                    <span>
                      <BsEye /> Detalhes
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
      <ModalComponent title={detailsTask.title}>
        <DetailsTask data={detailsTask} />
      </ModalComponent>
    </div>
  )
}

Task.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
