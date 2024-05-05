import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './NotFound.css'

const NotFound = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => navigate('/'), 5000); 
    return () => clearTimeout(timeoutId); 
  }, [navigate]);

  return (  
    <div className="not-found">
      <h1 className="not-found__title">Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <p className='not-found__text'>Back to <Link className='not-found__link' to="/">Home Page</Link>
      </p>
    </div>
  );
}
 
export default NotFound;