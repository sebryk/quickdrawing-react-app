import { GroupBase, StylesConfig } from 'react-select'
import { IOption, IOptions } from './types'

export const styles: StylesConfig<IOption, false, GroupBase<IOption>> = {
   control: (base, state) => ({
      ...base,
      width: '100%',
      height: '40px',
      borderRadius: '20px',
      textAlign: 'left',
      paddingLeft: '5px',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      backgroundColor: state.menuIsOpen
         ? 'var(--light-gray-color)'
         : state.isDisabled
           ? 'var(--dark-gray-color)'
           : 'var(--white-color)',
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer',
      color: state.isDisabled ? 'var(--black-color)' : 'var(--gray-color)',
      transition: '0.3s',
      ':hover': {
         backgroundColor: 'var(--light-gray-color)',
      },
   }),
   menu: (base) => ({
      ...base,
      borderRadius: '20px',
      marginTop: '2px',
   }),
   placeholder: (base, state) => ({
      ...base,
      color: state.isDisabled ? 'var(--black-color)' : 'var(--gray-color)',
      opacity: state.isDisabled ? '0.5' : '1',
   }),
   dropdownIndicator: (base, state) => {
      const hasValue = Boolean(state.selectProps.value)
      const isOpen = state.selectProps.menuIsOpen
      return {
         ...base,
         display: !isOpen && hasValue ? 'none' : 'flex',
         transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
         transition: 'transform 0.2s',
         color: !hasValue ? 'var(--gray-color)' : 'var(--red-color)',
         opacity: state.isDisabled ? '0.5' : '1',
         ':hover': {
            backgroundColor: 'none',
         },
      }
   },
   clearIndicator: (base, state) => {
      const isOpen = state.selectProps.menuIsOpen

      return {
         ...base,
         display: isOpen ? 'none' : 'flex',
         position: 'relative',
         right: '10px',
         border: '1px solid var(--red-color)',
         borderRadius: '50%',
         padding: '0',
         width: '18px',
         height: '18px',
         alignItems: 'center',
         color: 'var(--red-color)',

         ':hover': {
            backgroundColor: 'var(--red-color)',
            color: 'var(--white-color)',
            'border-color': 'transparent',
         },
      }
   },
   menuList: (base) => ({
      ...base,
      borderRadius: '20px',
      paddingTop: 0,
      paddingBottom: 0,
   }),
   indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
   }),
   singleValue: (base) => ({
      ...base,
      color: 'var(--red-color)',
   }),
   option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'var(--red-color)' : 'var(--gray-color)',
      backgroundColor: state.isSelected ? 'var(--white-color)' : '',
      textAlign: 'left',
      paddingLeft: '10px',
      fontFamily: 'Montserrat , sans-serif',
      fontWeight: '500',
      paddingBlock: '10px',
      ':hover': {
         backgroundColor: 'var(--light-gray-color)',
      },
      border: 0,
      cursor: 'pointer',
   }),
}

export const options: IOptions = {
   object: [
      { value: 'car', label: 'Car' },
      { value: 'building', label: 'Building' },
      { value: 'nature', label: 'Nature' },
      { value: 'creature', label: 'Creature' },
      { value: 'character', label: 'Character' },
      { value: 'animal', label: 'Animal' },
      { value: 'human', label: 'Human' },
   ],
   gender: [
      { value: '', label: 'All' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
   ],
   clothing: [
      { value: '', label: 'All' },
      { value: 'suit', label: 'Suit' },
      { value: 'casual', label: 'Casual' },
      { value: 'sport', label: 'Sport' },
      { value: 'naked', label: 'Naked' },
   ],
   count: [
      { value: 4, label: '4 images' },
      { value: 6, label: '6 images' },
      { value: 8, label: '8 images' },
      { value: 10, label: '10 images' },
   ],
   duration: [
      { value: 60, label: '1 min' },
      { value: 120, label: '2 min' },
      { value: 180, label: '3 min' },
      { value: 240, label: '4 min' },
      { value: 300, label: '5 min' },
   ],
}
