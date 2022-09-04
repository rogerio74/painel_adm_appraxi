import { doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { Button } from '../../../common/components/Button'
import { Layout } from '../../../common/components/Layout'
import { db } from '../../../common/services'
import { db_audio } from '../../../common/services/firebase_licao'
import { FormActivities } from '../components/FormTask2'
import { ListTask } from './ListTasks'
import styles from './styles.module.scss'

interface ITask {
  id: string
  title: string
  file: string
}

export const CreateTask = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const { back } = useRouter()

  async function update() {
    try {
      const colRef = doc(db_audio, 'capture', `current_licao`)

      await updateDoc(colRef, {
        tasks
      })
      back()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Adicionar Novas Lições</h2>
        <FormActivities setTasks={setTasks} />
      </div>
      <div className={styles.tasks}>
        <h2>Lições</h2>
        <ListTask tasks={tasks} />
        {tasks.length !== 0 && (
          <>
            <div className={styles.alert}> ⚠️ Essas lições irão substituir as atuais!!</div>
            <div className={styles.footer}>
              <Button onClick={() => update()} title="Salvar" />
              <Button onClick={() => back()} title="Cancelar" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

CreateTask.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
