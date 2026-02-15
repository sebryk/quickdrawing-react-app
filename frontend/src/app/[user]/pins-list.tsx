import Image from 'next/image'
import Link from 'next/link'
import type { AccountPin } from '@/services/pinterest-pins'
import styles from './styles.module.scss'

type PinsListProps = {
   pins: AccountPin[]
}

const PinsList = ({ pins }: PinsListProps) => {
   if (pins.length === 0) {
      return <p className={styles.account__empty}>No Pinterest pins yet.</p>
   }

   return (
      <section className={styles.account__pins}>
         {pins.map((pin) => (
            <article key={pin.id} className={styles.pin}>
               <div className={styles['pin__image-wrap']}>
                  {pin.imageUrl ? (
                     <Image
                        src={pin.imageUrl}
                        alt={pin.title ?? `Pinterest pin ${pin.id}`}
                        fill
                        className={styles['pin__image']}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  ) : (
                     <div className={styles['pin__placeholder']}>No image</div>
                  )}
               </div>

               <div className={styles['pin__body']}>
                  <h3 className={styles['pin__title']}>{pin.title ?? 'Untitled pin'}</h3>
                  {pin.description ? <p className={styles['pin__description']}>{pin.description}</p> : null}
                  {pin.link ? (
                     <Link href={pin.link} target="_blank" rel="noreferrer" className={styles['pin__link']}>
                        Open original
                     </Link>
                  ) : null}
               </div>
            </article>
         ))}
      </section>
   )
}

export default PinsList
