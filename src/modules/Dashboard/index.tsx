import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { LoadingAnimation } from '../../common/components/AnimationLoading'
import { db } from '../../common/services'
import { getAge, setAgesColumn } from '../../common/utils'
import { GraphPatientAge } from './components/GraphPatientsAge'
import { GraphPatientGender } from './components/GraphPatientsGender'
import { GraphPatientType } from './components/GraphPatientType'
import { ListAmount } from './components/ListAmount'
import styles from './styles.module.scss'

interface Igender {
  f: number
  m: number
}
interface IProps {
  premium: number
  free: number
}

export const Dashboard = () => {
  const [gender, setGender] = useState<Igender>({} as Igender)
  const [profile, setProfile] = useState<IProps>({} as IProps)
  const [ages, setAges] = useState<any>({} as any)
  const [isLoading, setIsLoading] = useState(true)
  const [amountPatient, setAmountPatient] = useState(0)
  const [amountFono, setAmountFono] = useState(0)
  const [amountFonoParceiro, setAmountFonoParceiro] = useState(0)

  async function getPatients() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(colRef)
      const querySnapshot = await getDocs(queryCollection)
      const data = querySnapshot.docs.map((d) => {
        return {
          id: d.id,
          ...d.data()
        }
      }) as any[]
      const patients = data.filter((item) => item.isAdmin === false && item.isFono === false)

      setGender({
        f: patients.filter((item) => item.sexo === 'Feminino').length,
        m: patients.filter((item) => item.sexo === 'Masculino').length
      })
      setProfile({
        free: patients.filter((item) => item.isPremium !== true).length,
        premium: patients.filter((item) => item.isPremium === true).length
      })
      const x = patients.map((item) => ({
        ...item,
        dataNascimento: item.dataNascimento
          ? getAge(item.dataNascimento.toDate())
          : 'nenhuma data informada'
      }))

      setAges(setAgesColumn(x))
      setAmountPatient(patients.length)
      setAmountFono(data.filter((item) => item.isFono === true).length)
      setAmountFonoParceiro(
        data.filter((item) => item.isFono === true && item.isAdmin === false).length
      )
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getPatients()
  }, [])

  return (
    <div className={styles.container}>
      <header>
        <h1>Dashboard</h1>
      </header>

      {isLoading ? (
        <div className={styles.loading}>
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <ListAmount
            amountFono={amountFono}
            amountFonoParceiro={amountFonoParceiro}
            amountPatient={amountPatient}
          />
          <div className={styles.graphs_patient}>
            <div className={styles.graph_line_patient}>
              <GraphPatientAge ages={ages} />
            </div>
            <div className={styles.graph_donut_patient}>
              <GraphPatientGender gender={gender} />
              <GraphPatientType data={profile} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
