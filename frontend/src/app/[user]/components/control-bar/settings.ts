import { GroupBase, StylesConfig } from 'react-select'
import { IOption } from '@/components/objects-form/types'

export const selectStyles: StylesConfig<IOption, false, GroupBase<IOption>> = {
   control: (base) => ({
      ...base,
      width: '100%',
      height: '40px',
      borderRadius: '1000px',
      textAlign: 'left',
      paddingLeft: '5px',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      backgroundColor: 'transparent',
      border: '1px solid #e6e6e62d',
      boxShadow: 'none',
      cursor: 'pointer',
      color: 'var(--white-color)',
      transition: '0.3s',
      ':hover': {
         backgroundColor: 'transparent',
      },
   }),
   menu: (base) => ({
      ...base,
      borderRadius: '20px',
      marginTop: '2px',
      transform: 'translateY(calc(-100% - 60px))',
      backgroundColor: 'rgb(49 49 49 / 60%)',
      border: '1px solid #e6e6e62d;',
      backdropFilter: 'blur(4px)',
   }),
   placeholder: (base, state) => ({
      ...base,
      color: 'var(--white-color)',
      opacity: state.isDisabled ? '0.5' : '1',
   }),
   dropdownIndicator: (base, state) => {
      const isOpen = state.selectProps.menuIsOpen
      return {
         ...base,
         transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
         transition: 'transform 0.2s',
         color: 'var(--white-color)',
         opacity: state.isDisabled ? '0.5' : '1',
         ':hover': {
            backgroundColor: 'none',
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
      color: 'var(--white-color)',
   }),
   option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'var(--red-color)' : 'var(--white-color)',
      backgroundColor: 'transparent',
      textAlign: 'left',
      paddingLeft: '10px',
      fontFamily: 'Montserrat , sans-serif',
      fontWeight: '500',
      paddingBlock: '10px',
      transition: 'color 0.2s',
      ':hover': {
         color: state.isSelected ? 'var(--red-color)' : 'var(--light-gray-color)',
      },
      border: 0,
      cursor: 'pointer',
   }),
}
