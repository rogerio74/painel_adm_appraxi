import styles from './styles.module.scss'

interface IDetailTask {
  link: string
}

export const DetailsTask = ({ link }: IDetailTask) => {
  return (
    <div className={styles.container}>
      <video loop autoPlay src={link} />
    </div>
  )
}
