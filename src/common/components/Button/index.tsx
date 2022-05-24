import React, { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface IButtonPros extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export const Button = ({ title, ...rest }: IButtonPros) => {
  return (
    <button className={styles.container_button} type="button" {...rest}>
      {title}
    </button>
  )
}
