/* eslint-disable no-plusplus */
import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options2 = {
  labels: ['masculino', 'feminino'],
  fill: {
    colors: ['#fb918a', '#8ec7f9']
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
    color: ['#fb918a', '#8ec7f9'],
    showForSingleSeries: false,

    floating: false,
    fontSize: '14px',
    fontWeight: 400,
    inverseOrder: false,

    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: ['#8ec7f9', '#fb918a'],
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#414141',
      fillColors: ['#8ec7f9', '#fb918a'],
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
      color: ['#8ec7f9', '#fb918a']
    }
  }
}

interface Igender {
  f: number
  m: number
}
interface IGraphProps {
  gender: Igender
}

export const GraphPatientGender = ({ gender }: IGraphProps) => {
  return (
    <div className={styles.container}>
      <h2>Gênero dos pacientes</h2>
      <Chart options={options2} series={[gender.f, gender.m]} type="pie" height={150} />
    </div>
  )
}
