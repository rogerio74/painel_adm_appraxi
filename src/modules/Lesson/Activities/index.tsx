import React from 'react'
import { ListActivities } from './components/ListActivities'
import styles from './styles.module.scss'

const Activities: React.FC = () => {
  return (
    <h1 className={styles.container}>
      <ListActivities />
    </h1>
  )
}

export default Activities
