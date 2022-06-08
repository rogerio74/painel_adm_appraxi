/* eslint-disable no-plusplus */
import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})
const options = {
  tooltip: {
    enabled: false
  },
  chart: {
    id: 'simple-bar',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: '#333'
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
  ages: any
}

export const GraphPatientAge = ({ ages }: IGraphProps) => {
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
