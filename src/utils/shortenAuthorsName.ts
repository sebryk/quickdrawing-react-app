import { IImage } from "../services/Types"

export const shortenAuthorsName = (image: IImage) => {
  const  authorsName = image?.user?.name 
  const shortAuthorsName = authorsName.length > 11 ? `${authorsName.slice(0, 12).trim()}...` : authorsName
    return shortAuthorsName
}