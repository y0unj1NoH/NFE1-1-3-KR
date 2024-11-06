import { getRandomProfile } from 'utils';

export const Profile = ({ index, size }: { index: number; size?: string }) => {
  const { profile } = getRandomProfile(index);

  return (
    <img
      alt='user-profile'
      className={`object-contain`}
      src={profile}
      style={{ width: size ? size : '2.5rem' }}
    />
  );
};
