import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiLock, BiLockOpen } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'

import { LoadingAnimation } from '../../../../common/components/AnimationLoading'

import { db_audio } from '../../../../common/services/firebase_licao'
import styles from './styles.module.scss'

export interface ILesson {
  bloqueada: boolean
  contador_arquivos: number
  contador_pastas: number
  id: string
  ordem: string
  palavras: object
}

export const Task: React.FC = () => {
  const [task, setTask] = useState<ILesson[]>([])
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  function getTasks() {
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

        console.log(data)
        setTask(data)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  async function handleEnabledLicao(licao: ILesson) {
    const colRef = doc(db_audio, 'licoes', `${licao.id}`)

    await updateDoc(colRef, {
      bloqueada: !licao.bloqueada
    })
  }

  useEffect(() => {
    getTasks()

    return () => getTasks()
  }, [])

  return (
    <div className={styles.container_list_users}>
      <header>
        <h1>Minhas Lições</h1>
      </header>
      {loading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <div className={styles.task}>
          <ul>
            {task ? (
              task.map((item) => (
                <li key={item.id}>
                  <strong>{item.id.split('_').join(' ')}</strong>
                  <button type="button" onClick={() => handleEnabledLicao(item)}>
                    {item.bloqueada ? (
                      <span>
                        <BiLock />
                        Bloquada
                      </span>
                    ) : (
                      <span>
                        <BiLockOpen />
                        Desbloquada
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => push({ pathname: 'lessons/details', query: { id: item.id } })}
                  >
                    <BsEye /> Ver Detalhes
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
