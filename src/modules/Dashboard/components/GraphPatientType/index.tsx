/* eslint-disable no-plusplus */
import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options2 = {
  labels: ['free', 'pro', 'premium'],
  fill: {
    colors: ['#a6faaa', '#f9ba8e', '#ff6c6c']
  },

  dataLabels: {
    style: {
      colors: ['#dadada']
    }
  },

  tooltip: {
    enabled: false,
    enabledOnSeries: undefined
  },
  legend: {
    show: true,
    color: ['#a6faaa', '#f9ba8e', '#ff6c6c'],
    showForSingleSeries: false,

    floating: false,
    fontSize: '16px',
    fontWeight: 400,
    inverseOrder: false,

    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: ['#a6faaa', '#f9ba8e', '#ff6c6c'],
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#292929',
      fillColors: ['#a6faaa', '#f9ba8e', '#ff6c6c'],
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
      color: ['#a6faaa', '#f9ba8e']
    }
  }
}

export const GraphPatientType = () => {
  return (
    <div className={styles.container}>
      <h2>Perfil dos paciente</h2>
      <Chart options={options2} series={[10, 40, 10]} type="pie" height={150} />
    </div>
  )
}
