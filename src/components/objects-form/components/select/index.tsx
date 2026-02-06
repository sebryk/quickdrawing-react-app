import Select from 'react-select'
import { IOption, ISelectedOptions, ObjectsFormSelectProps } from '../../types'
import { styles as selectStyles } from '../../settings'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectOption } from '@/store/slices/objects-form-slice'
import styles from './styles.module.scss'

const ObjectsFormSelect = ({
   options,
   placeholder,
   isDisabled,
   isVisible,
   isClearable,
   name,
}: ObjectsFormSelectProps) => {
   const selectedOptions = useAppSelector((state) => state.selectedOptions)
   const dispatch = useAppDispatch()

   const handleChange = (option: IOption | null) => {
      const selectedOption: ISelectedOptions = { [name]: option }
      dispatch(selectOption(selectedOption))
   }

   if (!isVisible) return null

   return (
      <div className={styles.select}>
         <Select
            styles={selectStyles}
            value={selectedOptions ? selectedOptions?.[name] : null}
            onChange={handleChange}
            className={styles['select__menu']}
            options={options}
            isSearchable={false}
            placeholder={placeholder}
            isDisabled={isDisabled}
            isClearable={isClearable}
         />
      </div>
   )
}

export default ObjectsFormSelect
