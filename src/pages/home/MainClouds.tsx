import { Cloud } from 'components';

export const MainClouds = () => (
  <div className='w-full'>
    <Cloud driftAmount={20} duration={25} initialX={-400} initialY={10} src='/bg/cloud-1.svg' />
    <Cloud driftAmount={50} duration={20} initialX={500} initialY={40} src='/bg/cloud-4.svg' />
    <Cloud driftAmount={30} duration={38} initialX={-400} initialY={180} src='/bg/cloud-5.svg' />
    <Cloud driftAmount={10} duration={30} initialX={1400} initialY={180} src='/bg/cloud-1.svg' />
    <Cloud driftAmount={30} duration={40} initialX={100} initialY={350} src='/bg/cloud-3.svg' />
    <Cloud driftAmount={50} duration={30} initialX={-200} initialY={600} src='/bg/cloud-4.svg' />
  </div>
);
