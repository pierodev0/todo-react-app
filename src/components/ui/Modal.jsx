import { Children } from "react";

function Modal({children}) {
    return (
      <>
        <div className='modal'>
          {children}
        </div>
  
        <div className='fixed inset-0 z-10 h-screen bg-black/50'></div>
      </>
    );
  }

export default Modal