import { Variant, VariantProps } from './types'
import styles from './styles.module.scss'
import { IoIosExit } from 'react-icons/io'

const VARIANT_PROPS: Record<Variant, VariantProps> = {
   close: {
      className: styles.close,
   },
   logout: {
      icon: IoIosExit,
      className: styles.logout,
   },
}

export default VARIANT_PROPS
