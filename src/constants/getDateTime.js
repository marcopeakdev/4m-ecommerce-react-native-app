export const getMonthNameAndYear = date => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const monthNames = [
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
  const monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  const d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  if (String(day).length === 1) {
    day = '0' + String(day);
  }
  if (String(d.getMonth() + 1).length === 1) {
    month = '0' + String(d.getMonth() + 1);
  }
  return {
    hours,
    minutes,
    ampm,
    monthShortNanme: monthShortNames[d.getMonth()],
    month: monthNames[d.getMonth()],
    monthDecimal: month,
    year: d.getFullYear(),
    day,
    dayName: days[d.getDay()]
  };
};
