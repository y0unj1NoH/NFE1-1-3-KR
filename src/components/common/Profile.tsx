import { getRandomProfile } from 'utils';

export const Profile = ({ size, index }: { size: number; index: number }) => {
  const { profile, color } = getRandomProfile(index);

  return (
    <div
      className={`bg-[${color}] w-[${size}] h-[${size}] p-2 flex items-center justify-center rounded-full`}
    >
      <img alt='user-profile' src={profile} />
    </div>
  );
};
