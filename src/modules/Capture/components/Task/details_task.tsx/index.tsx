import { Iword } from '..'
import styles from './styles.module.scss'

interface IDetailTask {
  data: Iword
}

export const DetailsTask = ({ data }: IDetailTask) => {
  return (
    <div className={styles.container}>
      <video loop autoPlay src={data.file} />
    </div>
  )
}
