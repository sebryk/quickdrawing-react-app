import { ContactFormValues } from '@/features/contact-form/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues: ContactFormValues = {
   name: '',
   email: '',
   message: '',
}

export const useContactForm = () => {
   const [isSubmitted, setIsSubmitted] = useState(false)
   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitSuccessful, isSubmitting },
   } = useForm<ContactFormValues>({ defaultValues })

   useEffect(() => {
      if (!isSubmitSuccessful) return
      setIsSubmitted(true)
      reset(defaultValues)

      const timeoutId = setTimeout(() => {
         setIsSubmitted(false)
      }, 10000)

      return () => clearTimeout(timeoutId)
   }, [isSubmitSuccessful, reset])

   const onSubmit = handleSubmit(() => {})

   return {
      register,
      onSubmit,
      isSubmitted,
      isSubmitting,
   }
}
