const capitalizeFirstChar = (str) => {
  if (str === undefined) {
    throw new Error('requires one argument of type string');
  }
  const trimmedStr = str.trim();
  const firstLetter = trimmedStr.charAt(0);
  const upperCased = firstLetter.toUpperCase();
  const remainingLetters = trimmedStr.slice(1);

  return `${upperCased}${remainingLetters}`;
};

export { capitalizeFirstChar };
