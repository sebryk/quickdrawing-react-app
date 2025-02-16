import { GroupBase, StylesConfig } from 'react-select';
import { IOption, IOptions } from './types';

export const styles: StylesConfig<IOption, false, GroupBase<IOption>> = {
   control: (base, state) => ({
      ...base,
      width: '200px',
      height: '40px',
      borderRadius: '20px',
      textAlign: 'left',
      paddingLeft: '5px',
      fontFamily: 'Montserrat',
      fontWeight: '600',
      backgroundColor: state.menuIsOpen ? '#E7E7E7' : state.isDisabled ? '#474747' : '#FFFFFF',
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer',
      color: state.isDisabled ? '#191919' : '#7F7F7F',
      transition: '0.3s',
      ':hover': {
         backgroundColor: '#E7E7E7',
      },
   }),
   menu: (base) => ({
      ...base,
      borderRadius: '20px',
      marginTop: '2px',
   }),
   placeholder: (base, state) => ({
      ...base,
      color: state.isDisabled ? '#191919' : '#7F7F7F',
      opacity: state.isDisabled ? '0.5' : '1',
   }),
   dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isDisabled ? '#191919' : '#7F7F7F',
      opacity: state.isDisabled ? '0.5' : '1',
      ':hover': {
         backgroundColor: 'none',
      },
   }),
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
      color: '#7F7F7F',
   }),
   option: (base, state) => ({
      ...base,
      color: state.isSelected ? '#F12354' : '#7F7F7F',
      backgroundColor: state.isSelected ? '#FFFFFF' : '',
      textAlign: 'left',
      paddingLeft: '10px',
      fontFamily: 'Montserrat',
      fontWeight: '600',
      paddingBlock: '10px',
      ':hover': {
         backgroundColor: '#E7E7E7',
      },
      border: 0,
      cursor: 'pointer',
   }),
};

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
};
