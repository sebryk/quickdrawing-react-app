import type { AccountPin } from '@/services/pinterest-pins'
import Image from 'next/image'
import styles from './styles.module.scss'

type PinsListProps = {
   pins: AccountPin[]
}

const PinsList = ({ pins }: PinsListProps) => {
   if (pins.length === 0) {
      return <p className={styles.pins__empty}>No Pinterest pins yet.</p>
   }

   return (
      <section className={styles.pins}>
         {pins.map((pin) => (
            <div key={pin.id} className={styles.pin}>
               <div className={styles['pin__image-wrap']}>
                  {pin.imageUrl ? (
                     <Image
                        fill={true}
                        src={pin.imageUrl}
                        alt={`Pinterest pin ${pin.id}`}
                        className={styles['pin__image']}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  ) : (
                     <div className={styles['pin__placeholder']}>No image</div>
                  )}
               </div>
            </div>
         ))}
      </section>
   )
}

export default PinsList
