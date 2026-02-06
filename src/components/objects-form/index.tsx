import { useNavigate } from 'react-router-dom'
import ObjectsFormSelect from './components/select'
import Button from '../ui/buttons/main-button'
import { useAppSelector } from '../../store/hooks'
import { options } from './settings'
import { ObjectsFormProps } from './types'
import { data } from './data'

const ObjectsForm = ({ className }: ObjectsFormProps) => {
   const selectedOptions = useAppSelector((state) => state.selectedOptions)

   const navigate = useNavigate()

   const { selectOption, button } = data
   const { object, gender, clothing, count, duration } = selectedOptions || {}

   const isHuman = object?.value === 'human'
   const hasBasicOptions = object && count && duration
   const hasHumanSpecificOptions = gender && clothing
   const isFormValid = isHuman ? hasBasicOptions && hasHumanSpecificOptions : hasBasicOptions

   return (
      <div className={className}>
         {selectOption.map((option) => {
            const isHumanSpecific = option.name === 'gender' || option.name === 'clothing'
            return (
               <ObjectsFormSelect
                  key={option.name}
                  placeholder={option.placeholder}
                  options={options[option.name]}
                  name={option.name}
                  isVisible={isHumanSpecific ? isHuman : true}
                  isClearable={true}
               >
                  {option.name}
               </ObjectsFormSelect>
            )
         })}
         <Button
            onClick={() => navigate('/drawing')}
            disabled={!isFormValid}
            variant="primary-with-arrow"
         >
            {button.title}
         </Button>
      </div>
   )
}

export default ObjectsForm
