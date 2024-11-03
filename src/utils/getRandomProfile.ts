export const getRandomProfile = (index: number) => {
  const randomCharacter = `/profile/character-${index}.png`;
  return { profile: randomCharacter };
};
