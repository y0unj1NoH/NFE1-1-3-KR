export const Post = () => {
  return (
    <div className='max-h-[16rem] h-full w-full px-2 py-[1.875rem] border-b border-[#243868] justify-center items-start gap-2 inline-flex'>
      <img
        alt='bookcover'
        className='object-contain w-auto h-full rounded'
        src='https://via.placeholder.com/147x193'
      />
      <div className='inline-flex flex-col items-start justify-between w-full h-full px-2'>
        <div className='inline-flex items-center self-stretch justify-start gap-4'>
          <img
            alt='user-profile'
            className='w-10 h-10 relative rounded-[100px]'
            src='https://via.placeholder.com/40x40'
          />
          <div className='text-[#333333] text-base font-normal leading-snug'>he2e2</div>
        </div>
        <div className='inline-flex flex-col items-start justify-center w-full gap-2 px-2'>
          <span className='text-[#333333] text-xs font-normal leading-none'>
            &lt;mid night sun&gt; - Stephenie Meyer
          </span>
          <span className='text-[#333333] text-base font-medium leading-snug'>Good</span>
        </div>
        <div className='px-2.5 py-1.5 flex justify-start items-center gap-2'>
          <img alt='likes' src='/empty-heart.svg' />
          <span className='text-[#333333] text-xs font-normal leading-none'>0</span>
          <img alt='captions' src='/caption.svg' />
          <span className='text-[#333333] text-xs font-normal leading-none'>0</span>
        </div>
      </div>
    </div>
  );
};
