/* eslint-disable no-plusplus */
export function getAge(dateString: string) {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export function setAgesColumn(data: any) {
  const arr = {
    menor: 0,
    '20': 0,
    '30': 0,
    '40': 0,
    '50': 0,
    '60': 0,
    '70': 0
  }

  data.forEach((item: any) => {
    if (item.dataNascimento >= 18 && item.dataNascimento < 30) {
      arr[20]++
    } else if (item.dataNascimento >= 30 && item.dataNascimento < 40) {
      arr[30]++
    } else if (item.dataNascimento >= 40 && item.dataNascimento < 50) {
      arr[40]++
    } else if (item.dataNascimento >= 50 && item.dataNascimento < 60) {
      arr[50]++
    } else if (item.dataNascimento >= 60) {
      arr[60]++
    } else {
      arr.menor++
    }
  })

  return arr
}
