import React from 'react'
import { Admins } from './components/Admins'
import { GraphPatient } from './components/GraphPatients'
import styles from './styles.module.scss'

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>DashBoard</h2>
      </div>
      <div className={styles.graph}>
        <GraphPatient title="Pacientes" />
        <GraphPatient title="Fonoaudiologos" />
      </div>
      <Admins />
    </div>
  )
}
