import React from 'react'
import { GraphPatient } from './components/GraphPatientsAge'
import { GraphPatientGender } from './components/GraphPatientsGender'
import { GraphPatientType } from './components/GraphPatientType'
import { ListAmount } from './components/ListAmount'
import styles from './styles.module.scss'

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>DashBoard</h2>
      </div>
      <ListAmount />
      <div className={styles.graphs_patient}>
        <div className={styles.graph_line_patient}>
          <GraphPatient />
        </div>
        <div className={styles.graph_donut_patient}>
          <GraphPatientGender />
          <GraphPatientType />
        </div>
      </div>
    </div>
  )
}
