import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsMicFill } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
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
          <Link href="/dashboard">
            <a data-isactive={asPath.includes('/dashboard')}>
              <MdDashboard />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/pacientes">
            <a data-isactive={asPath.includes('/pacientes')}>
              <RiUserVoiceLine />
            </a>
          </Link>
        </li>

        <li>
          <Link href="/projects">
            <a data-isactive={asPath.includes('/fonoaudiologo')}>
              <HiOutlineUserGroup />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admins">
            <a data-isactive={asPath.includes('/admins')}>
              <RiUserSettingsLine />
            </a>
          </Link>
        </li>

        <li data-isactive={asPath.includes('/capture')}>
          <Link href="/capture">
            <a>
              <BsMicFill />
            </a>
          </Link>
        </li>
        <li data-isactive={asPath.includes('/lessons')}>
          <Link href="/lessons">
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
