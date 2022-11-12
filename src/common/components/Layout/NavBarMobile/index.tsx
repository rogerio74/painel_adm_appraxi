import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsMicFill } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { RiUserSettingsLine, RiUserVoiceLine, RiVoiceRecognitionFill } from 'react-icons/ri'
import { useAuth } from '../../../contexts/AuthContext'
import styles from './styles.module.scss'

export const NavBarMobile = () => {
  const { signOut } = useAuth()
  const [open] = useState(true)
  const { asPath, replace } = useRouter()

  function handleLogout() {
    replace('/')
    signOut()
  }

  return (
    <motion.nav className={styles.container_navBar}>
      <ul data-isopen={open}>
        <li>
          <Link href="/home">
            <a data-isactive={asPath.includes('/home')}>
              <MdDashboard />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a data-isactive={asPath.includes('/users')}>
              <RiUserVoiceLine />
            </a>
          </Link>
        </li>

        <li>
          <Link href="/projects">
            <a data-isactive={asPath.includes('/settlements')}>
              <RiUserSettingsLine />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/inspections">
            <a data-isactive={asPath.includes('/inspections')}>
              <BsMicFill />
            </a>
          </Link>
        </li>

        <li data-isactive={asPath.includes('/notifications')}>
          <Link href="/notifications">
            <a>
              <RiVoiceRecognitionFill />
            </a>
          </Link>
        </li>
      </ul>
      <button
        data-isclose={open}
        type="button"
        className={styles.button_logout}
        onClick={handleLogout}
      >
        <BiLogOutCircle />{' '}
      </button>
    </motion.nav>
  )
}
