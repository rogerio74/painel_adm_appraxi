import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineVpnKey } from 'react-icons/md'
import * as yup from 'yup'
import Illustration from '../../common/assets/Illustration.svg'
import { Button } from '../../common/components/Button'
import { Input } from '../../common/components/Input'
import { useAuth } from '../../common/contexts/AuthContext'
import styles from './styles.module.scss'

interface IDataLogin {
  email: string
  password: string
}
const signInSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('O formato do e-mail é inválido'),
  password: yup.string().required('Senha é obrigatória')
})

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IDataLogin>({
    resolver: yupResolver(signInSchema)
  })

  const handleLogin: SubmitHandler<IDataLogin> = async (values) => {
    setLoading(true)
    try {
      await signIn(values)
    } catch (err) {
      console.log(err)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left_illustration}>
        <span>
          <h1>Appraxi</h1>
          <p>
            Painel administrativo para o gerencimento <br /> do aplicativo Appraxi
          </p>
        </span>
        <Image src={Illustration} alt="illustration of dashboard" />
      </div>
      <div className={styles.right_login}>
        <div className={styles.box_login}>
          <h2>Bem vindo!</h2>
          <p>Informe-nos seus dados para acessar o nosso painel administrativo</p>

          <form onSubmit={handleSubmit(handleLogin)}>
            <Input
              error={errors.email}
              {...register('email')}
              name="email"
              placeholder="Insira seu Email "
              Icon={<HiOutlineMail />}
            />
            <span />
            <Input
              autoComplete="false"
              error={errors.password}
              {...register('password')}
              isPassword
              name="password"
              placeholder="Insira sua Senha"
              Icon={<MdOutlineVpnKey />}
            />
            <Button type="submit" title={!loading ? 'Enviar' : '...'} />
          </form>
        </div>
      </div>
    </div>
  )
}
