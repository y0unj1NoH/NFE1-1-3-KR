import type { SectionTypes } from 'types';

interface SectionProps {
  title: string;
  items: SectionTypes[];
}

const Section = ({ title, items }: SectionProps) => {
  return (
    <div className='w-full md:w-1/2 mb-10'>
      <h2 className='text-center text-subtitle1 mb-4'>{title}</h2>
      <ul className='flex flex-col gap-2'>
        {items.map((item, index) => (
          <li key={index}>
            <div
              className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded'
              onClick={item.onClick}
              style={{ borderBottom: '2px solid #9CA3AF' }}
            >
              {item.icon}
              <p className='text-body1 w-full pb-1'>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
