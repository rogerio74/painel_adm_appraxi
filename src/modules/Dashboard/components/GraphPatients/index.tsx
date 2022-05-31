import { collection, getDocs, query, where } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../common/services'
import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})
const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: 'green'
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: 'blue'
    },
    axisTicks: {
      color: '#222'
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z'
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}
const options2 = { labels: ['Masculino', 'Feminino'] }
const series = [4, 5, 6, 1, 5]

interface Igender {
  f: number
  m: number
}
interface IGraphProps {
  title: string
}

export const GraphPatient = ({ title }: IGraphProps) => {
  const [gender, setGender] = useState<Igender>({} as Igender)

  async function getPatients() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(colRef, where('isFono', '==', true))
      const querySnapshot = await getDocs(queryCollection)
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as any[]

      setGender({
        f: data.length,
        m: data.length
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getPatients()
  }, [])

  if (!gender.f) return <h1>loading</h1>

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Chart
        options={options2}
        series={[gender.f, gender.m]}
        type="donut"
        height={400}
        width={300}
      />
    </div>
  )
}
