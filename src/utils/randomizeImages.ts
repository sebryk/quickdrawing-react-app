import { IImage } from '../api/types'

export const randomizeImages = (imgCount: number, imgData?: IImage[]) => {
   imgData = imgData || []
   let randomIndexes = new Set<number>()
   while (randomIndexes.size < imgCount) {
      randomIndexes.add(Math.floor(Math.random() * imgData.length))
   }

   let selectedElements = [...randomIndexes].map((index) => imgData[index])

   return selectedElements
}
