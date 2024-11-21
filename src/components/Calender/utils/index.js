const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
export const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

const getDayDetails = args => {
  const date = args.index - args.firstDay;
  const day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  const prevMonthNumberOfDays = getNumberOfDays(
    prevYear,
    prevMonth
  );
  const _date =
    (date < 0
      ? prevMonthNumberOfDays + date
      : date % args.numberOfDays) + 1;
  const month =
    date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  const timestamp = new Date(
    args.year,
    args.month,
    _date
  ).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day]
  };
};

export const getMonthDetails = (year, month) => {
  const firstDay = new Date(year, month).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  const monthArray = [];
  const rows = 6;
  let currentDay = null;
  let index = 0;
  const cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};
