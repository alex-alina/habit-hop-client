const ONE_DAY_IN_MILLISECONDS = 86400000;
const ONE_WEEK_IN_MILLISECONDS = ONE_DAY_IN_MILLISECONDS * 6;
const today = new Date();

//expects plainDate argument to be in "yyyy-mm-dd" format
const dateToTimestamp = (plainDate) => {
  const date = new Date(plainDate);
  const timestamp = Date.parse(date);

  return timestamp;
};

const isPresentDate = (selectedDate, currentDate = today) => {
  if (selectedDate === undefined) {
    throw new Error('selected date value is missing');
  }
  if (!selectedDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
    throw new Error('date format should be YYYY-MM-DD');
  }

  const userDateTimestamp = dateToTimestamp(selectedDate);
  const todayTimestamp = Date.parse(currentDate);
  const yesterdayTimestamp = todayTimestamp - ONE_DAY_IN_MILLISECONDS;

  return userDateTimestamp > yesterdayTimestamp;
};

const isOneWeekFromDate = (startDate, endDate) => {
  const endDateTimestamp = dateToTimestamp(endDate);
  const startDateTimestamp = dateToTimestamp(startDate);
  const oneWeekInFutureTimestamp =
    startDateTimestamp + ONE_WEEK_IN_MILLISECONDS;

  return endDateTimestamp > oneWeekInFutureTimestamp;
};

export { dateToTimestamp, isPresentDate, isOneWeekFromDate };
