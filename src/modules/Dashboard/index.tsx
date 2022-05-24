import React from 'react'
import { Admins } from './components/Admins'
import { GraphPatient } from './components/GraphPatients'
import styles from './styles.module.scss'

export const DashBoard = () => {
  return (
    <div className={styles.container}>
      <GraphPatient />
      <GraphPatient />
      <GraphPatient />
      <Admins />
    </div>
  )
}
