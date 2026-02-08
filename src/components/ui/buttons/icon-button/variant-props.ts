import { Variant, VariantProps } from './types'
import styles from './styles.module.scss'

const VARIANT_PROPS: Record<Variant, VariantProps> = {
   close: {
      className: styles.close,
   },
}

export default VARIANT_PROPS
