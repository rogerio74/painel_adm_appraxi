import { toast } from 'react-toastify'

interface IShowToastProps {
  type: 'info' | 'success' | 'warn' | 'error'
  message: string
}

export const showToast = ({ type, message }: IShowToastProps) => {
  switch (type) {
    case 'success':
      toast.success(message, { theme: 'light' })
      break
    case 'warn':
      toast.warn(message, { theme: 'light' })
      break
    case 'error':
      toast.error(message, { theme: 'light' })
      break
    default:
      toast.info(message, { theme: 'light' })
  }
}
