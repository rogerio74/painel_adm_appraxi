import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { Button } from '../../../common/components/Button'
import { Layout } from '../../../common/components/Layout'
import { db_audio } from '../../../common/services/firebase_licao'
import { FormActivities } from '../components/FormActivities'
import { ListTask } from './ListTasks'
import styles from './styles.module.scss'

interface ITask {
  id: string
  title: string
  file: string
}

export const CreateTask = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [name, setName] = useState('')
  const { back } = useRouter()

  async function createTask() {
    try {
      const colRef = doc(db_audio, 'cache', name)

      await setDoc(colRef,
        {title: name,tasks}
      )
      back()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Adicionar Novas Lições</h2>
        <FormActivities isUpdate={false} name={name} setName={setName} setTasks={setTasks} />
      </div>
      <div className={styles.tasks}>
        <h2>Lições</h2>
        <ListTask tasks={tasks} />
        {tasks.length !== 0 && (
          <>
            <div className={styles.alert}> ⚠️ Essas lições irão substituir as atuais!!</div>
            <div className={styles.footer}>
              <Button onClick={() => createTask()} title="Salvar" />
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
