import cn from 'classnames'
import { BiChevronRight } from 'react-icons/bi'
import styles from './styles.module.scss'
import { Variant, VariantProps } from './types'

const VARIANT_PROPS: Record<Variant, VariantProps> = {
   primary: {
      className: styles.primary,
   },
   'primary-with-arrow': {
      className: cn(styles.primary, styles['primary-with-arrow']),
      icon: BiChevronRight,
      iconPosition: 'right',
   },
   accent: {
      className: styles.accent,
   },
   transparent: {
      className: styles.transparent,
   },
}
export default VARIANT_PROPS
