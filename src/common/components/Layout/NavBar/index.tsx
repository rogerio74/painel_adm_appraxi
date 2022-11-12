import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsBoxArrowLeft, BsBoxArrowRight, BsMicFill } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'
import { RiUserSettingsLine, RiUserVoiceLine, RiVoiceRecognitionFill } from 'react-icons/ri'
import { useAuth } from '../../../contexts/AuthContext'
import styles from './styles.module.scss'
import { LinkComponent } from './Link'

const Links = [
  { id: '1', icon: <MdDashboard />, params: '/dashboard', title: 'Dashboard' },
  { id: '2', icon: <RiUserVoiceLine />, params: '/pacientes', title: 'Pacientes' },
  { id: '3', icon: <HiOutlineUserGroup />, params: '/fonoaudiologo', title: 'Fonoaudiologo' },
  { id: '4', icon: <RiUserSettingsLine />, params: '/admins', title: 'Administradores' },
  { id: '5', icon: <BsMicFill />, params: '/capture', title: 'Captura' },
  { id: '6', icon: <RiVoiceRecognitionFill />, params: '/lessons', title: 'Lições' }
]

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(true)
  const { asPath } = useRouter()
  const { signOut, userDt } = useAuth()

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

  useEffect(() => {
    function getWidth() {
      if (window.innerWidth > 768) {
        setOpenMenu(true)
      } else {
        setOpenMenu(false)
      }
    }
    window.addEventListener('resize', getWidth)

    return () => window.removeEventListener('resize', getWidth)
  }, [])

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
          {userDt?.nome}
        </motion.h2>
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
