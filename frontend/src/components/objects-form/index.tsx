'use client'

import cn from 'classnames'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '../../store/hooks'
import Button from '../ui/buttons/main-button'
import ObjectsFormSelect from './components/select'
import { data } from './data'
import { options } from './settings'
import styles from './styles.module.scss'

const ObjectsForm = () => {
   const selectedOptions = useAppSelector((state) => state.selectedOptions)
   const router = useRouter()

   const { selectOption, button } = data
   const { object, gender, clothing, count, duration } = selectedOptions || {}

   const isHuman = object?.value === 'human'
   const hasBasicOptions = object && count && duration
   const hasHumanSpecificOptions = gender && clothing
   const isFormValid = isHuman ? hasBasicOptions && hasHumanSpecificOptions : hasBasicOptions

   return (
      <div className={cn(styles['objects-form'], { [styles['objects-form--human']]: isHuman })}>
         {selectOption.map((option) => {
            const isHumanSpecific = option.name === 'gender' || option.name === 'clothing'
            return (
               <ObjectsFormSelect
                  key={option.name}
                  name={option.name}
                  isClearable={true}
                  options={options[option.name]}
                  placeholder={option.placeholder}
                  isVisible={isHumanSpecific ? isHuman : true}
               >
                  {option.name}
               </ObjectsFormSelect>
            )
         })}
         <Button
            disabled={!isFormValid}
            variant="primary-with-arrow"
            onClick={() => router.push('/drawing')}
         >
            {button.title}
         </Button>
      </div>
   )
}

export default ObjectsForm
