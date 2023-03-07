const capitalizeWord = (str) => {
  const firstLetter = str.charAt(0);
  const upperCased = firstLetter.toUpperCase();
  const remainingLetters = str.slice(1);
  return `${upperCased}${remainingLetters}`;
};

export { capitalizeWord };
