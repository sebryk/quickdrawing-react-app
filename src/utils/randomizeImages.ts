import { IImage } from '../api/types'

export const randomizeImages = (imgCount: number, imgData?: IImage[]) => {
   imgData = imgData || []
   const safeCount = Math.min(imgCount, imgData.length)
   if (safeCount === 0) {
      return []
   }

   let randomIndexes = new Set<number>()
   while (randomIndexes.size < safeCount) {
      randomIndexes.add(Math.floor(Math.random() * imgData.length))
   }

   let selectedElements = [...randomIndexes].map((index) => imgData[index])

   return selectedElements
}
