import Lottie from 'react-lottie'
import { AnimationLoading } from '../../assets/animation'

export const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,

    autoplay: true,
    animationData: AnimationLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Lottie
      style={{
        maxWidth: 100
      }}
      width="100%"
      height="auto"
      options={defaultOptions}
    />
  )
}
