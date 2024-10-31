import Section from './Section';

export const MyPageContent = () => {
  const linkedAccountItems = [
    { icon: <img src='/icon/google.svg' alt='Google' />, text: 'kc0393@gmail.com' },
  ];

  const postItems = [
    { icon: <img src='/icon/post.svg' />, text: 'PACHINKO' },
    { icon: <img src='/icon/post.svg' />, text: 'PACHINKO' },
    { icon: <img src='/icon/post.svg' />, text: 'PACHINKO' },
  ];

  const commentItems = [
    { icon: <img src='/icon/comment.svg' />, text: 'This book is very nice!' },
    { icon: <img src='/icon/comment.svg' />, text: 'This book is very nice!' },
    { icon: <img src='/icon/comment.svg' />, text: 'This book is very nice!' },
  ];

  const bookmarkItems = [
    {
      icon: <img src='/' className='w-16 h-24' />,
      text: 'The JEALOUS KIND',
    },
    {
      icon: <img src='/' className='w-16 h-24' />,
      text: 'The JEALOUS KIND',
    },
    {
      icon: <img src='/' className='w-16 h-24' />,
      text: 'The JEALOUS KIND',
    },
  ];

  return (
    <div className='w-full items-center flex flex-col overflow-y-scroll'>
      <Section title='Linked account' items={linkedAccountItems} />
      <Section title='Post written' items={postItems} />
      <Section title='Comment' items={commentItems} />
      <Section title='Bookmark' items={bookmarkItems} />
    </div>
  );
};
