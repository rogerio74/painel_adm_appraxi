import { word } from '..'
import styles from './styles.module.scss'

interface IDetailTask {
  data: word
}

export const DetailsTask = ({ data }: IDetailTask) => {
  return (
    <div className={styles.container}>
      <video loop autoPlay src={data.file} />
    </div>
  )
}
