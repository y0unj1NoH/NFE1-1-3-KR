import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Cloud } from './Cloud';

export const ContentsContainer = ({ childNode }: { childNode: ReactNode }) => {
  const location = useLocation();

  return (
    <div className='h-full lg:w-[60%] w-full relative'>
      <div className='md:h-[calc(100vh-10rem)] h-full w-full md:p-10 p-4 flex-col justify-start items-center inline-flex bg-text-white md:rounded-t-[80px] absolute bottom-0 z-[20]'>
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
          <>
            <Cloud
              driftAmount={50}
              duration={30}
              initialX={100}
              initialY={10}
              src='/bg/cloud-4.svg'
            />
            <Cloud
              driftAmount={10}
              duration={38}
              initialX={-100}
              initialY={330}
              src='/bg/cloud-5.svg'
            />
            <Cloud
              driftAmount={20}
              duration={25}
              initialX={-90}
              initialY={520}
              src='/bg/cloud-1.svg'
            />
            <Cloud
              driftAmount={30}
              duration={28}
              initialX={-130}
              initialY={700}
              src='/bg/cloud-3.svg'
            />
          </>
        </>
      )}
    </div>
  );
};
