import React, { ReactNode } from 'react'
import { NavBar } from './NavBar'
import styles from './styles.module.scss'

interface ILayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.container_layout}>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}
