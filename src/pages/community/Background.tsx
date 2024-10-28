export const Background = () => {
  return (
    <div className='absolute top-0 bottom-0 w-full'>
      <div className='absolute bottom-0 flex -left-8'>
        {Array.from({ length: 20 }).map((_, index) => (
          <img alt='bg-ellipse' key={index} src='/bg/Ellipse.svg' />
        ))}
      </div>
    </div>
  );
};
