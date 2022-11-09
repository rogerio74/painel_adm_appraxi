import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
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

export const UpdateTask = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const { back , query: q} = useRouter()
  const [name, setName] = useState('')
console.log(q.id)
  async function update() {
    try {
      const colRef = doc(db_audio, 'cache', `${q.id}`)

      await updateDoc(colRef, {
        tasks: arrayUnion(...tasks)
      })
      back()
      console.log('here')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Adicionar Novas Lições</h2>
        <FormActivities isUpdate={true} name={name} setName={setName} setTasks={setTasks} />
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

UpdateTask.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
