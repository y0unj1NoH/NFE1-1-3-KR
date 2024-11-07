export const Rating = ({ rating }: { rating: number }) => {
  const maxRating = 5;
  const filledHearts = Math.floor(rating / 2);
  const hasHalfHeart = rating % 2 !== 0 && filledHearts < maxRating;
  
  return (
    <div className='flex space-x-0.5'>
      {Array.from({ length: filledHearts }).map((_, index) => (
        <img
          alt='full heart'
          className='xxs:w-4 xxs:h-4 sm:w-6 sm:h-6'
          key={`full-${index}`}
          src='/Icon/filled-heart.svg'
        />
      ))}

      {hasHalfHeart && (
        <img
          alt='half heart'
          className='xxs:w-4 xxs:h-4 sm:w-6 sm:h-6'
          key='half'
          src='/Icon/half-heart.svg'
        />
      )}

      {Array.from({ length: maxRating - filledHearts - (hasHalfHeart ? 1 : 0) }).map((_, index) => (
        <img
          alt='empty heart'
          className='xxs:w-4 xxs:h-4 sm:w-6 sm:h-6'
          key={`empty-${index}`}
          src='/Icon/white-heart.svg'
        />
      ))}
    </div>
  );
};
