import { Toaster } from 'sonner';

const MessageBar = () => {
   return (
      <Toaster
         position="top-center"
         visibleToasts={1}
         toastOptions={{
            style: {
               background: 'rgba(25, 25, 25, 0.8)',
               color: 'var(--red-color)',
               border: 'none',
               fontFamily: 'Montserrat',
               textAlign: 'center',
               width: 'unset',
               top: '5px',
               right: '40px',
            },
            className: 'my-toast',
         }}
      />
   );
};

export default MessageBar;
