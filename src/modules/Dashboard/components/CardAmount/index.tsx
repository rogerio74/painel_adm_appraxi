import React, { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ICardProps {
  title: string
  amount: number
  Icon: ReactNode
  bgcolor: string
}

export const CardAmount = ({ amount, bgcolor, title, Icon }: ICardProps) => {
  return (
    <div style={{ backgroundColor: bgcolor }} className={styles.container_card_dashboard}>
      <div className={styles.header_card_dashboard}>
        <h2>{title}</h2>
      </div>

      <div className={styles.center_card_dashboard}>
        <strong>{amount}</strong>
        <span>Total</span>
      </div>
    </div>
  )
}
