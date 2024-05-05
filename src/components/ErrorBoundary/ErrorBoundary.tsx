import { FC, ReactNode } from "react";
import './ErrorBoundary.css'
import { Link } from "react-router-dom";

interface IErrorBoundaryProps {
  children: ReactNode

}

const ErrorBoundary: FC<IErrorBoundaryProps> = ({children}) => {
  return (  
    <div className="error-boundary">
      <h1 className="error-boundary__title">
        {children}
      </h1>
      <p className="error-boundary__text">Please try one more time, if the error persists&nbsp;  
        <Link 
          to='/contact'
          className="error-boundary__link"
        > 
          contact us
        </Link>
      </p>
      <p className="error-boundary__text"> Back to&nbsp;
        <Link
          to='/'
          className="error-boundary__link"
        >
        home page
        </Link>
      </p>
    </div>
  );
}
 
export default ErrorBoundary;