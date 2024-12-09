import { useEffect, useRef } from 'react';

export function useScrollToBottom(){
  const endRef = useRef(null);
  const startRef = useRef(null);


  useEffect(() => {
    const end = endRef.current;
    const start = startRef.current;
    if (end&&start) {
      const observer = new MutationObserver(() => {
        // console.log('IntersectionObserver triggered');
        end.scrollIntoView({ behavior : 'instant' });
      });

      observer.observe(start,{
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => {
        observer.disconnect();
      };
    } 
  }, []);

  return [startRef,endRef];
};

