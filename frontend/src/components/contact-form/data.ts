import type { ContactFormData } from './types'

export const data: ContactFormData = {
   fields: [
      {
         name: 'name',
         type: 'text',
         placeholder: 'Full Name',
         props: {
            required: true,
         },
      },
      {
         name: 'email',
         type: 'email',
         placeholder: 'Email',
         props: {
            required: true,
            pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
         },
      },
      {
         name: 'message',
         placeholder: 'Message',
         props: { required: true },
      },
   ],
   button: {
      title: 'Send',
   },
   success: 'Thank you for your message. We will connect with you very soon!',
}
