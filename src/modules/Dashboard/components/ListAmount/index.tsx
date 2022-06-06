import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdImageSearch } from 'react-icons/md'
import { db } from '../../../../common/services'
import { CardAmount } from '../CardAmount'
import styles from './styles.module.scss'

export const ListAmount = () => {
  const [amountPatient, setAmountPatient] = useState(0)
  const [amountFono, setAmountFono] = useState(0)
  const [amountFonoParceiro, setAmountFonoParceiro] = useState(0)

  async function getPatients() {
    try {
      const colRef = collection(db, 'usuarios')
      const queryCollection = query(colRef)
      const querySnapshot = await getDocs(queryCollection)
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as any[]

      console.log(data)
      setAmountFono(data.filter((item) => item.isFono === true).length)
      setAmountFonoParceiro(
        data.filter((item) => item.isFono === true && item.isAdmin === true).length
      )
      setAmountPatient(
        data.filter((item) => item.isFono === false && item.isAdmin === false).length
      )
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getPatients()
  }, [])

  return (
    <div className={styles.amount}>
      <CardAmount
        amount={amountFono}
        bgcolor="red"
        Icon={<MdImageSearch />}
        title="Total de pacientes"
      />
      <CardAmount
        amount={amountFonoParceiro}
        bgcolor="red"
        Icon={<MdImageSearch />}
        title="Total de pacientes"
      />
      <CardAmount
        amount={amountPatient}
        bgcolor="red"
        Icon={<MdImageSearch />}
        title="Total de pacientes"
      />
    </div>
  )
}
