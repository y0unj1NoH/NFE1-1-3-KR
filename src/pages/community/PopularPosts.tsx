import { useState, useEffect } from 'react';

const dummyPosts = [
  {
    id: 0,
    title: 'Did you read this book0?',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: 1,
    title: 'Did you read this book1?',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: 2,
    title: 'Did you read this book2?',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: 3,
    title: 'Did you read this book3?',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: 4,
    title: 'Did you read this book4?',
    image: 'https://via.placeholder.com/40x40',
  },
];

export const PopularPosts = () => {
  const [currentPosterId, setCurrentPosterId] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentPosterId(prev => (prev + 1) % dummyPosts.length);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <div
      className='w-7/12 h-[3.56rem] rounded-[60px] border-2 border-text-white justify-start items-center flex-col overflow-hidden'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {dummyPosts.map(post => (
        <div
          className='inline-flex p-2.5 items-center gap-2.5 w-full h-full duration-300 ease-in transition-all'
          key={post.id}
          style={{ transform: `translateY(-${currentPosterId}00%)` }}
        >
          <img
            alt='profile'
            className='w-10 h-10 relative rounded-[100px] border border-text-white'
            src={post.image}
          />
          <div className='text-xs font-normal leading-none text-text-white'>{post.title}</div>
        </div>
      ))}
    </div>
  );
};
