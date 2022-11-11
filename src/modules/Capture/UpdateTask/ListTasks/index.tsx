import styles from './styles.module.scss'

interface ITask {
  id: string
  title: string
  file: string
}

interface Iprops {
  tasks: ITask[]
}

export const ListTask = ({ tasks }: Iprops) => {
  return (
    <div className={styles.container_list_users}>
      <div className={styles.task}>
        <ul>
          {tasks.length !== 0 ? (
            tasks.map((item) => <li key={item.id}>{item.title}</li>)
          ) : (
            <div className={styles.empty}>
              <span>Adicione novas lições</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}
