'use client'

import cn from 'classnames'
import Select from 'react-select'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectOption } from '@/store/slices/objects-form-slice'
import { styles as selectStyles } from '../../settings'
import { IOption, ISelectedOptions, ObjectsFormSelectProps } from '../../types'
import styles from './styles.module.scss'

const ObjectsFormSelect = ({
   options,
   placeholder,
   isDisabled,
   isVisible,
   isClearable,
   name,
   className,
   customStyles,
}: ObjectsFormSelectProps) => {
   const selectedOptions = useAppSelector((state) => state.selectedOptions)
   const dispatch = useAppDispatch()

   const handleChange = (option: IOption | null) => {
      const selectedOption: ISelectedOptions = { [name]: option }
      dispatch(selectOption(selectedOption))
   }

   if (!isVisible) return null

   return (
      <div className={cn(styles.select, className)}>
         <Select
            options={options}
            isSearchable={false}
            onChange={handleChange}
            isDisabled={isDisabled}
            placeholder={placeholder}
            isClearable={isClearable}
            className={styles['select__menu']}
            styles={customStyles || selectStyles}
            value={selectedOptions ? selectedOptions?.[name] : null}
         />
      </div>
   )
}

export default ObjectsFormSelect
