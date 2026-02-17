'use client'

import { useRef, useEffect, useState } from 'react'
import { useGetImagesByTypeQuery } from '@/api/imagesApi'
import Error from '@/components/error/error'
import ImageSlider from '@/components/image-slider'
import LoadingBar from '@/components/loading-bar/loading-bar'
import { mouseIsMoving } from '@/store/slices/image-slider-slice'
import Modal from '../../components/image-slider/components/modal'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getRandomNumber } from '../../utils/getRandomNumber'
import styles from './styles.module.scss'

const Drawing = () => {
   const dispatch = useAppDispatch()
   const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
   const lastMouseMoveAt = useRef(0)
   const [randomPageNumber, setRandomPageNumber] = useState(0)

   const { object, gender, clothing, count } =
      useAppSelector((state) => state.selectedOptions) || {}
   const { isMouseOver, key } = useAppSelector((state) => state.imageSlider)
   const { isOpen } = useAppSelector((state) => state.modal)
   // const sessionType = useAppSelector((state) => state.imageSlider.sessionType)
   const selectedPins = useAppSelector((state) => state.pins.selectedPins)

   const isHuman = object?.value === 'human'
   const objectQuery = isHuman
      ? `${object.value} ${gender?.value} ${clothing?.value}`.trim()
      : object?.value

   const { data, isLoading, error } = useGetImagesByTypeQuery({
      query: String(objectQuery),
      page: randomPageNumber,
      count: Number(count?.value),
   })

   const handleMouseMove = () => {
      const now = Date.now()
      if (now - lastMouseMoveAt.current < 100) {
         return
      }
      lastMouseMoveAt.current = now

      dispatch(mouseIsMoving(true))
      if (timeoutId.current) clearTimeout(timeoutId.current)

      if (!isMouseOver) {
         timeoutId.current = setTimeout(() => {
            dispatch(mouseIsMoving(false))
         }, 3000)
      }
   }

   useEffect(() => {
      setRandomPageNumber(getRandomNumber(1))

      return () => {
         if (timeoutId.current) {
            clearTimeout(timeoutId.current)
         }
         handleMouseMove()
      }
   }, [])

   if (!object) {
      return <Error>Error: Options are not selected</Error>
   }

   if (error && 'status' in error) {
      return <Error>Error: {error.status}</Error>
   }

   if (isLoading || !data) {
      return <LoadingBar />
   }

   return (
      <section
         key={key}
         role="none"
         onMouseMove={handleMouseMove}
         onMouseDown={handleMouseMove}
         className={styles['drawing-section']}
      >
         {isOpen && <Modal />}

         <ImageSlider data={selectedPins} />
      </section>
   )
}

export default Drawing
