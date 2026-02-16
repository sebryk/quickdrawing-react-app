import { FiLogOut } from 'react-icons/fi'
import { PiArrowCircleLeftThin } from 'react-icons/pi'
import styles from './styles.module.scss'
import { Variant, VariantProps } from './types'

const VARIANT_PROPS: Record<Variant, VariantProps> = {
   close: {
      className: styles.close,
   },
   back: {
      icon: PiArrowCircleLeftThin,
      className: styles.back,
   },
   logout: {
      icon: FiLogOut,
      className: styles.logout,
   },
}

export default VARIANT_PROPS
