import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export const ContentsContainer = ({ childNode }: { childNode: ReactNode }) => {
  const location = useLocation();

  return (
    <div className='h-full w-[868px] relative'>
      <div className='h-[50rem] w-[868px] p-10 flex-col justify-start items-center inline-flex bg-text-white rounded-t-[80px] absolute bottom-0 z-[9999] overflow-x-scroll'>
        {childNode}
      </div>
      {location.pathname.startsWith('/community') && (
        <>
          <div className="absolute h-[100px] w-[250px] -right-[14rem] bottom-[38rem] bg-[url('/bg/cloud-1.svg')] bg-no-repeat bg-contain z-10"></div>
          <div className="absolute h-[100px] w-[250px] -left-[12rem] bottom-[15rem] bg-[url('/bg/cloud-3.svg')] bg-no-repeat bg-contain z-10"></div>
        </>
      )}
    </div>
  );
};
