import { useNavigate } from 'react-router-dom'
import ObjectsFormSelect from './ObjectsFormSelect'
import Button from '../../components/ui/buttons/main-button'
import './ObjectsForm.css'
import { useAppSelector } from '../../store/hooks'
import { options } from './objectFormSettings'
import { BiChevronRight } from 'react-icons/bi'

const Form = () => {
   const selectedOptions = useAppSelector((state) => state.selectedOptions)

   const navigate = useNavigate()

   const { object, gender, clothing, count, duration } = selectedOptions || {}
   const isHuman = object?.value === 'human'
   const hasBasicOptions = object && count && duration
   const hasHumanSpecificOptions = gender && clothing

   const isFormValid = isHuman ? hasBasicOptions && hasHumanSpecificOptions : hasBasicOptions

   return (
      <div className="home-section__inputs">
         <ObjectsFormSelect placeholder="Select object" options={options.object} name="object">
            Object
         </ObjectsFormSelect>
         <ObjectsFormSelect
            placeholder="Select gender"
            options={options.gender}
            name="gender"
            isDisabled={!isHuman}
         >
            Gender
         </ObjectsFormSelect>
         <ObjectsFormSelect
            placeholder="Select clothing"
            options={options.clothing}
            name="clothing"
            isDisabled={!isHuman}
         >
            Clothing
         </ObjectsFormSelect>
         <ObjectsFormSelect placeholder="Select count" options={options.count} name="count">
            Count
         </ObjectsFormSelect>
         <ObjectsFormSelect
            placeholder="Select duration"
            options={options.duration}
            name="duration"
         >
            Interval
         </ObjectsFormSelect>
         <Button
            onClick={() => navigate('/drawing')}
            disabled={!isFormValid}
            variant="primary-with-arrow"
         >
            Get Drawing
         </Button>
      </div>
   )
}

export default Form
