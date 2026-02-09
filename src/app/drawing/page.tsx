'use client'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Modal from '../../components/image-slider/components/modal'
import { useRef, useEffect, useState } from 'react'
import { mouseIsMoving } from '@/store/slices/image-slider-slice'
import ImageSlider from '@/components/image-slider'
import { useGetImagesByTypeQuery } from '../../api/imagesApi'
import { DataContext } from '../../context/context'
import Error from '../../components/error/error'
import LoadingBar from '../../components/loading-bar/loading-bar'
import { getRandomNumber } from '../../utils/getRandomNumber'
import styles from './styles.module.scss'

const Drawing = () => {
   const dispatch = useAppDispatch()
   const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
   const [randomPageNumber, setRandomPageNumber] = useState(0)

   const { object, gender, clothing, count } =
      useAppSelector((state) => state.selectedOptions) || {}
   const { isMouseOver, key } = useAppSelector((state) => state.imageSlider)
   const { isOpen } = useAppSelector((state) => state.modal)

   const isHuman = object?.value === 'human'
   const objectQuery = isHuman
      ? `${object.value} ${gender?.value} ${clothing?.value}`.trim()
      : object?.value

   const { data, isLoading, error, refetch } = useGetImagesByTypeQuery({
      query: String(objectQuery),
      page: randomPageNumber,
      count: Number(count?.value),
   })

   const handleMouseMove = () => {
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
         className={styles['drawing-section']}
         onMouseMove={handleMouseMove}
         onMouseDown={handleMouseMove}
         key={key}
      >
         {isOpen && <Modal />}
         <DataContext.Provider value={{ data, refetch }}>
            <ImageSlider />
         </DataContext.Provider>
      </section>
   )
}

export default Drawing
