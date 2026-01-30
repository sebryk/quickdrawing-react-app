import { Variant, VariantProps } from './types'
import styles from './styles.module.scss'
import cn from 'classnames'
import { BiChevronRight } from 'react-icons/bi'

const VARIANT_PROPS: Record<Variant, VariantProps> = {
   primary: {
      className: styles.primary,
   },
   'primary-with-arrow': {
      className: cn(styles.primary, styles['primary-with-arrow']),
      icon: BiChevronRight,
      iconPosition: 'right',
   },
}
export default VARIANT_PROPS
