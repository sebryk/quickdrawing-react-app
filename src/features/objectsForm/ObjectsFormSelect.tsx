import Select from 'react-select'
import { FC, Dispatch, SetStateAction } from 'react';
import { IOption, ISelectedOptions } from './Types';
import { styles } from './ObjectFormStyle'
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectOption } from './objectsFormSlice';

interface ObjectsFormSelectProps {
  options: {value: string | number, label: string}[]
  placeholder: string
  isDisabled?: boolean
  name: string
  children: string
}

const ObjectsFormSelect: FC<ObjectsFormSelectProps> = ({...props}) => {

  const { 
    options, 
    placeholder, 
    isDisabled, 
    name, 
    children,
  } = props

  const selectedOptions = useAppSelector(state => state.selectedOptions)
  const dispatch = useAppDispatch()

  const handleChange = (option: IOption | null) => {
    if (option) {
      const selectedOption: ISelectedOptions = {[name]: option}
      dispatch(selectOption(selectedOption))
    }
  };

  
  

  return ( 
    <div className={`select select--${children?.toLowerCase()}`}>
      <h1 className={`select__title ${isDisabled ? 'select__title--disabled' : ''}`}>{children}</h1> 
      <Select
        styles={styles}
        value={selectedOptions ? selectedOptions?.[name] : null} 
        onChange={handleChange}
        className='select__menu'
        options={options} 
        isSearchable={false}
        placeholder={placeholder}
        isDisabled={isDisabled}
      />
    </div>
  );
}
 
export default ObjectsFormSelect;