import { getRandomProfile } from 'utils';

export const Profile = ({ index }: { index: number }) => {
  const { profile } = getRandomProfile(index);

  return (
    <img
      alt='user-profile'
      className={`object-contain md:w-[2.5rem] md:h-[2.5rem] w-[1.5rem] h-[1.5rem]`}
      src={profile}
    />
  );
};
