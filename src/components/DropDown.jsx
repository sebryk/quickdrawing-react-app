import { useState } from 'react';
import Select from 'react-select';

const styles = {
  control: (base, state) => ({
    ...base,
    width: "200px",
    height: "40px",
    borderRadius: "20px",
    textAlign: "left",
    paddingLeft: "5px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    backgroundColor: state.menuIsOpen ? "#E7E7E7" : "#FFFFFF",
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "20px",
    marginTop: '2px',

  }),
  menuList: (base) => ({
    ...base,
    borderRadius: "20px",
    paddingTop: 0,
    paddingBottom: 0,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#7F7F7F",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "#F12354" : "#7F7F7F",
    backgroundColor: state.isSelected && "#FFFFFF",
    textAlign: "left",
    paddingLeft: "15px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    ':hover': {
    backgroundColor: "#E7E7E7",
    },
    border: 0,
  })
}

function DropDown({ placeholder, inputName, options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dropdown">
      <h1 className='dropdown__title'>{inputName}</h1>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options} 
        isSearchable={false}
        placeholder={placeholder}
        className='dropdown__menu'
        styles={styles}
      />
      {/* <p>You selected {selectedOption ? selectedOption.label : 'nothing'}.</p> */}
    </div>
  );
}

export default DropDown;
