import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { LoadingAnimation } from '../../../common/components/AnimationLoading'
import { Layout } from '../../../common/components/Layout'
import { ModalComponent } from '../../../common/components/Modal'
import { useModal } from '../../../common/contexts/ModalContext'
import { db_audio } from '../../../common/services/firebase_licao'

import { DetailsTask } from './details_task.tsx'
import styles from './styles.module.scss'

export interface ITask {
  id: string
  title: string
  palavras: Iword[]
}

export interface Iword {
  id: string
  title: string
  file: string
}

export const Task = () => {
  const [task, setTask] = useState<ITask>({} as ITask)
  const [detailsTask, setDetailsTask] = useState<Object>({} as Object)
  const [loading, setLoading] = useState(true)
  const { push, query: q } = useRouter()
  const { handleOpenModal } = useModal()

  const getTask = useCallback(async () => {
    try {
      const docRef = doc(db_audio, 'licoes', `${q.id}`)
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

  function showDetails(word: Iword) {
    handleOpenModal()
    setDetailsTask(word)
  }

  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>{task.id}</h1>
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.task}>
          <h2>Atividades:</h2>
          <ul>
            {task.palavras ? (
              task.palavras.map((item) => (
                <li key={Object.keys(item)[0]}>
                  <strong>{Object.keys(item)[0]}</strong>
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
      <ModalComponent title={Object.keys(detailsTask)[0]}>
        <DetailsTask link={Object.values(detailsTask)[0]} />
      </ModalComponent>
    </div>
  )
}

Task.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
