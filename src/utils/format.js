const capitalizeFirstLetter = (str) => {
  if (str === undefined) {
    throw new Error('requires one argument of type string');
  }
  const firstLetter = str.charAt(0);
  const upperCased = firstLetter.toUpperCase();
  const remainingLetters = str.slice(1);
  return `${upperCased}${remainingLetters}`;
};

export { capitalizeFirstLetter };
