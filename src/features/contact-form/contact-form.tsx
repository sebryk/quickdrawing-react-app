import cn from 'classnames'
import Button from '@/components/ui/buttons/main-button'
import TextInput from '@/components/ui/inputs/text-input'
import { useContactForm } from '@/hooks/useContactForm'
import { data } from './data'
import styles from './styles.module.scss'

const ContactForm = () => {
   const { register, onSubmit, isSubmitted, isSubmitting } = useContactForm()
   const { fields, submit, success } = data

   return (
      <form className={styles['contact-form']} onSubmit={onSubmit}>
         {fields.map(({ name, type, placeholder, props }) => {
            const isTextArea = name === 'message'
            return (
               <TextInput
                  key={name}
                  className={cn({
                     [styles['contact-form__input']]: !isTextArea,
                     [styles['contact-form__textarea']]: isTextArea,
                  })}
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  inputProps={!isTextArea ? register(name, props) : undefined}
                  textareaProps={isTextArea ? register(name, props) : undefined}
               />
            )
         })}
         <Button
            type="submit"
            className={cn(styles['contact-form__button'], 'btn', {
               'btn--disabled': isSubmitted || isSubmitting,
            })}
            disabled={isSubmitted || isSubmitting}
         >
            {submit.label}
         </Button>
         {isSubmitted && <p className={styles['contact-form__message']}>{success}</p>}
      </form>
   )
}

export default ContactForm
