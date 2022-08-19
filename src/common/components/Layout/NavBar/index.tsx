import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsBoxArrowLeft, BsBoxArrowRight } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'
import { RiVoiceRecognitionFill, RiUserSettingsLine, RiUserVoiceLine } from 'react-icons/ri'
import { useAuth } from '../../../contexts/AuthContext'
import { LinkComponent } from './Link'
import styles from './styles.module.scss'

const Links = [
  { id: '1', icon: <MdDashboard />, params: '/dashboard', title: 'Dashboard' },
  { id: '2', icon: <RiUserVoiceLine />, params: '/pacientes', title: 'Pacientes' },
  { id: '3', icon: <HiOutlineUserGroup />, params: '/fonoaudiologo', title: 'Fonoaudiologo' },
  { id: '4', icon: <RiUserSettingsLine />, params: '/admins', title: 'Administradores' },
  { id: '5', icon: <RiVoiceRecognitionFill />, params: '/capture', title: 'Captura' }
]

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(true)
  const { asPath } = useRouter()
  const { signOut } = useAuth()

  function handleOpenMenu() {
    setOpenMenu(!openMenu)
  }
  const menuVariants = {
    open: {
      width: 230
    },
    close: {
      width: 60,
      alignItems: 'center'
    }
  }

  const itensVariants = {
    open: {
      left: 0,
      x: 0
    },
    close: {
      x: -30,
      opacity: 0,
      display: 'none'
    }
  }

  return (
    <motion.nav
      transition={{ duration: 0.2, delay: !openMenu ? 0.6 : 0 }}
      className={styles.container_nav_bar}
      initial="open"
      animate={openMenu ? 'open' : 'close'}
      variants={menuVariants}
    >
      <div className={styles.header_nav_bar}>
        <motion.h2 initial="open" animate={openMenu ? 'open' : 'close'} variants={itensVariants}>
          Appraxi
        </motion.h2>
        <button type="button" onClick={handleOpenMenu}>
          {openMenu ? <BsBoxArrowLeft /> : <BsBoxArrowRight />}
        </button>
      </div>
      <ul>
        {Links.map((item, i) => (
          <li data-active={asPath.includes(item.params)} key={item.id}>
            <LinkComponent
              initial="open"
              animate={openMenu ? 'open' : 'close'}
              variants={itensVariants}
              transition={{ delay: !openMenu ? i * 0.1 : i * 0.4 }}
              {...item}
            />
          </li>
        ))}
      </ul>
      <div className={styles.button_logout}>
        <button onClick={() => signOut()} data-isClose={openMenu} type="button">
          <BiLogOutCircle />
          <span>Sair do App</span>
        </button>
      </div>
    </motion.nav>
  )
}
