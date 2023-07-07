import { BiChevronRight } from 'react-icons/bi';

function Button({ name, type }) {
  return (  
      <button 
      className="main-content__btn btn"
      >
        {name}
        <BiChevronRight 
        className='main-content__btn-icon btn-icon'
        type={type}
        />
      </button>
  );
}

export default Button