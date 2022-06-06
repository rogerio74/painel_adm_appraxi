/* eslint-disable no-plusplus */
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options2 = {
  fill: {
    colors: ['#f44336', '#2e7d32']
  },

  dataLabels: {
    style: {
      colors: ['#fff', '#fff']
    }
  },

  tooltip: {
    enabled: false,
    enabledOnSeries: undefined
  },
  legend: {
    show: true,
    color: ['#f44336', '#2e7d32'],
    showForSingleSeries: false,

    floating: false,
    fontSize: '14px',
    fontWeight: 400,
    inverseOrder: false,

    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: ['#2e7d32', '#f44336'],
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#414141',
      fillColors: ['#2e7d32', '#f44336'],
      radius: 12,
      offsetX: 0,
      offsetY: 0
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0
    },
    onItemClick: {
      toggleDataSeries: false
    },
    onItemHover: {
      highlightDataSeries: false,
      color: ['#2e7d32', '#f44336']
    }
  }
}

interface Igender {
  f: number
  m: number
}
interface IGraphProps {
  title: string
}

export const GraphPatientType = () => {
  const [gender, setGender] = useState<Igender>({} as Igender)

  /*   async function getPatients() {
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

      setGender({
        f: data.length,
        m: data.length
      })
    } catch (err) {
      console.log(err)
    }
  } */
  /*   useEffect(() => {
    getPatients()
  }, []) */

  return (
    <div className={styles.container}>
      <h2>Gênero dos pacientes</h2>
      <Chart options={options2} series={[10, 40]} type="pie" height={150} />
    </div>
  )
}
