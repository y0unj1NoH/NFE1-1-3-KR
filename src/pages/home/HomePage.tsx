import { Intro } from './Intro';
import { SlideTemp } from './SlideTemp';

export const HomePage = () => {
  return (
    <div className='w-full h-full'>
      <Intro />
      <SlideTemp />
    </div>
  );
};

export default HomePage;
