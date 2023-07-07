import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import Button from "../components/Button";

const objectInputOptions = [
  { value: 'human', label: 'Human' },
  { value: 'animals', label: 'Animals' },
  { value: 'creature', label: 'Creature' },
  { value: 'characters', label: 'Characters' }
];
const genderInputOptions = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];
const clothingInputOptions = [
  { value: 'all', label: 'All' },
  { value: 'naked', label: 'Naked' },
  { value: 'suit', label: 'Suit' },
  { value: 'casual', label: 'Casual' },
  { value: 'sport', label: 'Sport' }
];
const countInputOptions = [
  { value: '5', label: '5 images' },
  { value: '10', label: '10 images' },
  { value: '20', label: '20 images' },
  { value: '30', label: '30 images' }
];
const intervalInputOptions = [
  { value: '1', label: '1 min' },
  { value: '2', label: '2 min' },
  { value: '3', label: '3 min' },
  { value: '4', label: '4 min' },
  { value: '5', label: '5 min' }
];


function Home() {

  return (
    <main className="main-content">
        <h1 className="main-content__title">
          What do you want to draw?
        </h1>
        <p className="main-content__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod 
          tempor, consectetur adipiscing elit.
        </p>
        <div className="main-content__inputs">
          <DropDown
            placeholder='Select object'
            inputName='Object'
            options={objectInputOptions}
          />
          <DropDown
            placeholder='Select gender'
            inputName='Gender'
            options={genderInputOptions}
          />
          <DropDown
            placeholder='Select clothing'
            inputName='Clothing'
            options={clothingInputOptions}
          />
          <DropDown
            placeholder='Select count'
            inputName='Count'
            options={countInputOptions}
          />
          <DropDown
            placeholder='Select interval'
            inputName='Interval'
            options={intervalInputOptions}
          />
          <Link
            to="/drawing"
            className="main-content__link"
          >
          <Button
            name="Get Drawing"
          />
          </Link>
        </div>
    </main>
  );
}

export default Home;