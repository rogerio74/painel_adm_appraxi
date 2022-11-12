import React, { ReactNode, useState } from 'react'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import styles from './styles.module.scss'

interface ILayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className={styles.container_layout}>
      <div className={styles.nav_mobile}>
        <button type="button" onClick={() => setOpenMenu(!openMenu)}>
          +
        </button>
        {openMenu && <NavBarMobile />}
      </div>
      <NavBar />
      <main className={styles.main_layout}>{children}</main>
    </div>
  )
}
