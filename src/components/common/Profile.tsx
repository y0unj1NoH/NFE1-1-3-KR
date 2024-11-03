import { getRandomProfile } from 'utils';

export const Profile = ({ index }: { index: number }) => {
  const { profile } = getRandomProfile(index);

  return (
    <img alt='user-profile' className={`object-contain w-[2.5rem] h-[2.5rem]`} src={profile} />
  );
};
