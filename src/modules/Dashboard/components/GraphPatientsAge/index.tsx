/* eslint-disable no-plusplus */
import { collection, getDocs, query, where } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../common/services'
import { getAge, setAgesColumn } from '../../../../common/utils'
import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})
const options = {
  chart: {
    id: 'simple-bar',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: 'blue'
  },

  xaxis: {
    categories: ['18 - 20', '21 - 30', '31 - 40', '51 - 60', '61 - 100']
  },
  yaxis: {
    show: false
  }
}

interface Igender {
  f: number
  m: number
}
interface IGraphProps {
  title: string
}

export const GraphPatient = () => {
  const [gender, setGender] = useState<Igender>({} as Igender)
  const [ages, setAges] = useState<any>({} as any)

  async function getPatients() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(
        colRef,
        where('isFono', '==', false),
        where('isAdmin', '==', false)
      )
      const querySnapshot = await getDocs(queryCollection)
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as any[]

      const x = data.map((item) => ({
        ...item,
        dataNascimento: item.dataNascimento
          ? getAge(item.dataNascimento.toDate())
          : 'nenhuma data informada'
      }))

      setAges(setAgesColumn(x))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getPatients()
  }, [])
  const series = [
    {
      name: 'Quant. de pacientes', // will be displayed on the y-axis
      data: [ages[20], ages[30], ages[40], ages[50], ages[60]]
    }
  ]

  if (ages.length === 0) return <h1>loading</h1>

  return (
    <div className={styles.container}>
      <h2>Faixa etária dos pacientes</h2>

      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  )
}
