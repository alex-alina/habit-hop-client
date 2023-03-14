const ONE_DAY_IN_MILLISECONDS = 86400000;

const isPresentDate = (value) => {
  const userDate = new Date(value);
  const userDateTimestamp = Date.parse(userDate);

  const today = new Date();
  const todayTimestamp = Date.parse(today);
  const yesterdayTimestamp = todayTimestamp - ONE_DAY_IN_MILLISECONDS;

  return userDateTimestamp > yesterdayTimestamp;
};

export { isPresentDate };
