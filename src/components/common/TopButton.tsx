export const TopButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className='absolute flex items-center justify-center p-2 rounded-full shadow-lg z-9999 bottom-4 right-4 bg-primary hover:animate-up'
      onClick={onClick}
    >
      <img
        alt='top-button'
        className='object-contain w-8 h-8 transition-transform duration-200 ease-out'
        src='/chevron-top.svg'
      />
    </button>
  );
};
