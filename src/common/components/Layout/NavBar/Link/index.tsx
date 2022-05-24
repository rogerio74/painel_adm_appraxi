import { motion, MotionProps } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface ILinkProps extends MotionProps {
  title: string
  icon: ReactNode
  params: string
}

export const LinkComponent = ({ icon, title, params, ...rest }: ILinkProps) => {
  return (
    <Link href={params}>
      <a>
        {icon}
        <motion.span {...rest}>{title}</motion.span>
      </a>
    </Link>
  )
}
