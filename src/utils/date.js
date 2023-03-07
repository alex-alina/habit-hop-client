const parseDateToDDMonthYYYY = (date) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();

  const longMonth = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(month);

  return `${day} ${longMonth} ${year}`;
};

export { parseDateToDDMonthYYYY };
