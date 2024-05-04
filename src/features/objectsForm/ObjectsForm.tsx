import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ObjectsFormSelect from "./ObjectsFormSelect";
import Button from "../../components/Button/Button";
import { IOptions, IOption, ISelectedOptions } from "./Types";
import './ObjectsForm.css'
import { useAppSelector } from "../../store/hooks";




const options: IOptions = {
  object: [
    { value: 'characters', label: 'Characters' },
    { value: 'animals', label: 'Animals' },
    { value: 'creature', label: 'Creature' },
    { value: 'human', label: 'Human' },
  ],
  gender: [
    { value: '', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
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



const Form = () => {

  const selectedOptions = useAppSelector(state => state.selectedOptions)

  const navigate = useNavigate()

    const isFormValid = 
  selectedOptions?.object?.value !== 'human' 
  && selectedOptions?.object && selectedOptions?.count && selectedOptions?.duration 
  || selectedOptions?.object?.value === 'human' 
  && selectedOptions?.object && selectedOptions?.gender &&selectedOptions?.clothing 
  && selectedOptions?.count && selectedOptions?.duration

  return (  
<>
  <div className="home-section__inputs">
    <ObjectsFormSelect 
    placeholder="Select object" 
    options={options.object}
    name='object'
    >
      Object
    </ObjectsFormSelect>
    <ObjectsFormSelect 
    placeholder="Select gender" 
    options={options.gender}
    name='gender'
    isDisabled={selectedOptions?.object?.value !== 'human' ? true : false}
    >
      Gender
    </ObjectsFormSelect>
    <ObjectsFormSelect 
    placeholder="Select clothing" 
    options={options.clothing}
    name='clothing'
    isDisabled={selectedOptions?.object?.value !== 'human' ? true : false}
    >
      Clothing
    </ObjectsFormSelect>
    <ObjectsFormSelect 
    placeholder="Select count" 
    options={options.count}
    name='count'
    >
      Count
    </ObjectsFormSelect>
    <ObjectsFormSelect 
    placeholder="Select duration" 
    options={options.duration}
    name='duration'
    >
      Interval
    </ObjectsFormSelect>  
      <Button
        className={`home-section__btn btn ${isFormValid ? '' : 'home-content__btn--disabled' }`}
        handleClick={() => navigate('/drawing')}
        // onClick={handleFormSubmit}
      >
        Get Drawing
      </Button>
    </div>
</>
  );
}
 
export default Form;