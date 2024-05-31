import React, {useEffect} from 'react'

const useOnclickOutside = (ref, handler) => {
  useEffect(() => {

    const listener = (event) => {
        console.log('ref', ref.current);
        if(!ref.current || ref.current.contains(event.target)) {
            return;
        }
        handler();
    };

    document.addEventListener("mousedown", listener)  
  
    return () => {
      document.addEventListener("mousedown", listener)
    }
  }, [])
  
}

export default useOnclickOutside