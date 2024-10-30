import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Cloud } from './Cloud';

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
          <Cloud
            src='/bg/cloud-1.svg'
            duration={15}
            initialX={-600}
            initialY={120}
            driftAmount={40}
          />
          <Cloud
            src='/bg/cloud-3.svg'
            duration={28}
            initialX={-700}
            initialY={200}
            driftAmount={20}
          />
        </>
      )}
      {location.pathname.startsWith('/profile') && (
        <>
          <>
            <Cloud
              src='/bg/cloud-4.svg'
              duration={30}
              initialX={-600}
              initialY={10}
              driftAmount={50}
            />
            <Cloud
              src='/bg/cloud-5.svg'
              duration={38}
              initialX={-1600}
              initialY={330}
              driftAmount={10}
            />
            <Cloud
              src='/bg/cloud-1.svg'
              duration={25}
              initialX={-900}
              initialY={520}
              driftAmount={20}
            />
            <Cloud
              src='/bg/cloud-3.svg'
              duration={28}
              initialX={-1300}
              initialY={700}
              driftAmount={30}
            />
          </>
        </>
      )}
    </div>
  );
};
