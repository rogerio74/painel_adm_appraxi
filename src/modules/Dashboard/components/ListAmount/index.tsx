import React from 'react'
import { MdImageSearch } from 'react-icons/md'
import { CardAmount } from '../CardAmount'
import styles from './styles.module.scss'

interface IListAmountProps {
  amountPatient: number
  amountFono: number
  amountFonoParceiro: number
}

export const ListAmount = ({ amountFono, amountFonoParceiro, amountPatient }: IListAmountProps) => {
  return (
    <div className={styles.amount}>
      <CardAmount
        amount={amountPatient}
        bgcolor="#52A3D0"
        Icon={<MdImageSearch />}
        title="Pacientes"
      />
      <CardAmount
        amount={amountFono}
        bgcolor="#52A3D0"
        Icon={<MdImageSearch />}
        title="Fonoaudiólogos"
      />
      <CardAmount
        amount={amountFonoParceiro}
        bgcolor="#52A3D0"
        Icon={<MdImageSearch />}
        title="Fonoaudiólogos parceiros"
      />
    </div>
  )
}
