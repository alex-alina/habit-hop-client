const ONE_DAY_IN_MILLISECONDS = 86400000;
const ONE_WEEK_IN_MILLISECONDS = ONE_DAY_IN_MILLISECONDS * 7;

const isPresentDate = (value) => {
  const userDate = new Date(value);
  const userDateTimestamp = Date.parse(userDate);

  const today = new Date();
  const todayTimestamp = Date.parse(today);
  const yesterdayTimestamp = todayTimestamp - ONE_DAY_IN_MILLISECONDS;

  return userDateTimestamp > yesterdayTimestamp;
};

const isOneWeekFromDate = (offset, reference) => {
  const offsetDate = new Date(offset);
  const offsetDateTimestamp = Date.parse(offsetDate);

  const referenceDate = new Date(reference);
  const referenceDateTimestamp = Date.parse(referenceDate);
  const oneWeekInFutureTimestamp =
    referenceDateTimestamp + ONE_WEEK_IN_MILLISECONDS;

  return offsetDateTimestamp > oneWeekInFutureTimestamp;
};

export { isPresentDate, isOneWeekFromDate };
