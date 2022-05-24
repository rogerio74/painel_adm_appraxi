import { useEffect, useState } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import styles from './styles.module.scss'

interface Props<T> {
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  rows: T[]
  columns: ICollumn[]
}

interface ICollumn {
  name: string
  id: string
}

export const Table = <T,>({ rows, columns, renderItem, keyExtractor }: Props<T>) => {
  const [startSlice, setStartSlice] = useState(0)
  const [Interval, setInterval] = useState(1)
  const [endSlice, setEndSlice] = useState(8)
  const [rowSlice, setRowSlice] = useState<T[]>([])

  function handlePagination(call: string) {
    if (endSlice < rows.length && call === 'next') {
      setStartSlice((prev) => prev + 8)
      setEndSlice((prev) => prev + 8)
      setInterval((prev) => prev + 1)
    }
    if (startSlice > 0 && call === 'before') {
      setStartSlice((prev) => prev - 8)
      setEndSlice((prev) => prev - 8)
      setInterval((prev) => prev - 1)
    }
  }

  useEffect(() => {
    setRowSlice(rows.slice(startSlice, endSlice))
  }, [startSlice, endSlice, rows])

  return (
    <div className={styles.container_table}>
      <table>
        <thead>
          <tr>
            {columns.map((item) => (
              <th key={item.id}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowSlice.map((item) => (
            <tr key={keyExtractor(item)}>{renderItem(item)}</tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span>
          {Interval} - {Math.floor(1 + rows.length / 8)} de {Math.floor(1 + rows.length / 8)}
        </span>
        <div className={styles.buttons_pagination}>
          <button onClick={() => handlePagination('before')} type="button">
            <IoMdArrowDropleft />
          </button>
          <span>{Interval}</span>
          <button onClick={() => handlePagination('next')} type="button">
            <IoMdArrowDropright />
          </button>
        </div>
      </div>
    </div>
  )
}
