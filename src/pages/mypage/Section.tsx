import type { SectionTypes } from 'types';

interface SectionProps {
  title: string;
  items: SectionTypes[];
}

const Section = ({ title, items }: SectionProps) => {
  return (
    <div className='w-full mb-10 md:w-1/2'>
      <h2 className='mb-4 text-center text-subtitle1 text-[#161616]'>{title}</h2>
      <ul className='flex flex-col gap-2'>
        {items.map((item, index) => (
          <li key={index}>
            <div
              className='flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-200'
              onClick={item.onClick}
              style={{ borderBottom: '2px solid #9CA3AF' }}
            >
              {item.icon}
              <p className='w-[80%] pb-1 break-words text-body1 text-[#333333]'>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
