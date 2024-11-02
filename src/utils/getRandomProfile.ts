export const getRandomProfile = (index: number) => {
  const randomCharacter = `/profile/character-${index}.png`;
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return { profile: randomCharacter, color: randomColor };
};
