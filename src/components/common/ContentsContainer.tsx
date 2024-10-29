import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export const ContentsContainer = ({ childNode }: { childNode: ReactNode }) => {
  const location = useLocation();

  return (
    <div className='h-full md:w-[60%] w-full relative'>
      <div className='md:h-[calc(100vh-10rem)] h-full w-full p-10 flex-col justify-start items-center inline-flex bg-text-white md:rounded-t-[80px] absolute bottom-0 z-[1000]'>
        {childNode}
      </div>
      {location.pathname.startsWith('/community') && (
        <>
          <div className="absolute h-[100px] w-[250px] -right-[14rem] bottom-[38rem] bg-[url('/bg/cloud-1.svg')] bg-no-repeat bg-contain z-10"></div>
          <div className="absolute h-[100px] w-[250px] -left-[12rem] bottom-[15rem] bg-[url('/bg/cloud-3.svg')] bg-no-repeat bg-contain z-10"></div>
        </>
      )}
      {location.pathname.startsWith('/profile') && (
        <>
          <div className="absolute h-[150px] w-[300px] -right-[24rem] bottom-[20rem] bg-[url('/bg/cloud-4.svg')] bg-no-repeat bg-contain z-10"></div>
          <div className="absolute h-[150px] w-[300px] -left-[10rem] top-[1rem] bg-[url('/bg/cloud-5.svg')] bg-no-repeat bg-contain z-10"></div>
          <div className="absolute h-[100px] w-[250px] -right-[14rem] bottom-[38rem] bg-[url('/bg/cloud-1.svg')] bg-no-repeat bg-contain z-10"></div>
          <div className="absolute h-[100px] w-[250px] -left-[12rem] bottom-[15rem] bg-[url('/bg/cloud-3.svg')] bg-no-repeat bg-contain z-10"></div>
        </>
      )}
    </div>
  );
};
