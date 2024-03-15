/**
 * Determines if a given year is a leap year.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} - True if the year is a leap year, false otherwise.
 */

const isLeapYear = (year) => {
  if (year % 4 !== 0) {
    return false;
  } else if (year % 100 !== 0) {
    return true;
  } else if (year % 400 !== 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * Getting days in months of a year.
 *
 * Dependency: isLeapYear
 *
 * @param {number} year
 * @returns {Array} Array of numbers of days for all months of given year.
 *                  Index 0 to 13 , index 0  = 0, 1-12 months.
 */
const getDaysInMonths = (year) => {
  let dim = [];
  dim[0] = 0;
  dim[1] = 31;
  if (isLeapYear(year)) {
    dim[2] = 29;
  } else {
    dim[2] = 28;
  }
  dim[3] = 31;
  dim[4] = 30;
  dim[5] = 31;
  dim[6] = 30;
  dim[7] = 31;
  dim[8] = 31;
  dim[9] = 30;
  dim[10] = 31;
  dim[11] = 30;
  dim[12] = 31;

  return dim;
};

/**
 * Days in a Month
 *
 * Dependency: getDaysInMonths
 *
 * @param {number} month
 * @param {number} year
 * @returns {number} Number of days in given month of given year.
 */

// days in a month of year ---> not months of a year
// =================================================
const daysInMonth = (month, year) => {
  var dim = getDaysInMonths(year); // return days in all months of given year .. [0,31, ......, 31]
  let days = 0; // Why set to zero ,  for type in JS, typeof days is "number".
  for (var i = 1; i < month; i++) {
    days += dim[i];
  }

  return days;
};

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {number} Index of week day
 */

const getWeekday = (year, month, day) => {
  var date = new Date(year, month - 1, day); // Js array index are zero base
  return date.getDay();
};

// index 0 is blank string monthArray[0] = "";
const monthArray = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// [ Sunday = 0 , ....., Saturday = 6]
const weekDaysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* ------------------------ Create response Object --------------------- */
/**
 * Create response Object
 *
 * This function takes a year and a month as input and returns an object representing the specified month.
 * The object contains the month's id, name, and an array of objects representing each day of the month.
 * Each day object contains the date, weekday id, and weekday name.
 *
 * @param {number} year - The year of the month.
 * @param {number} month - The month (1-12).
 * @returns {Object} - An object representing the specified month.
 */
const monthObject = (year, month) => {
  // Get the number of days in each month of the specified year
  const dimArray = getDaysInMonths(year);
  // Create an array of objects representing each month
  const mda = dimArray.slice(1).map((days, index) => ({
    id: index + 1,
    name: monthArray[index + 1],
    days,
  }));

  // Find the object representing the specified month
  const monthToFind = mda.find((obj) => obj.id === month);

  // Get the number of days in the specified month
  const foundMonthDays = monthToFind.days;
  // days object
  const daysObject = Array.from({ length: foundMonthDays }, (_, day) => {
    const wd_id = getWeekday(year, month, day + 1);
    return {
      date: day + 1,
      wdId: wd_id,
      wdName: weekDaysArray[wd_id],
    };
  });
  // ---------
  const mObj = {
    id: monthToFind.id,
    name: monthToFind.name,
    dim: monthToFind.days,
    days: daysObject,
  };
  return mObj;
};
/*
Local Test
input :
  year: 2024
  month: 2
console.log(resObject(2024, 2));

output:

{
  id: 2,
  name: 'February',
  days: [
    { date: 1, wdId: 4, wdName: 'Thursday' },
    { date: 2, wdId: 5, wdName: 'Friday' },
    { date: 3, wdId: 6, wdName: 'Saturday' },
    { date: 4, wdId: 0, wdName: 'Sunday' },
    { date: 5, wdId: 1, wdName: 'Monday' },
    { date: 6, wdId: 2, wdName: 'Tuesday' },
    { date: 7, wdId: 3, wdName: 'Wednesday' },
    { date: 8, wdId: 4, wdName: 'Thursday' },
    { date: 9, wdId: 5, wdName: 'Friday' },
    { date: 10, wdId: 6, wdName: 'Saturday' },
    { date: 11, wdId: 0, wdName: 'Sunday' },
    { date: 12, wdId: 1, wdName: 'Monday' },
    { date: 13, wdId: 2, wdName: 'Tuesday' },
    { date: 14, wdId: 3, wdName: 'Wednesday' },
    { date: 15, wdId: 4, wdName: 'Thursday' },
    { date: 16, wdId: 5, wdName: 'Friday' },
    { date: 17, wdId: 6, wdName: 'Saturday' },
    { date: 18, wdId: 0, wdName: 'Sunday' },
    { date: 19, wdId: 1, wdName: 'Monday' },
    { date: 20, wdId: 2, wdName: 'Tuesday' },
    { date: 21, wdId: 3, wdName: 'Wednesday' },
    { date: 22, wdId: 4, wdName: 'Thursday' },
    { date: 23, wdId: 5, wdName: 'Friday' },
    { date: 24, wdId: 6, wdName: 'Saturday' },
    { date: 25, wdId: 0, wdName: 'Sunday' },
    { date: 26, wdId: 1, wdName: 'Monday' },
    { date: 27, wdId: 2, wdName: 'Tuesday' },
    { date: 28, wdId: 3, wdName: 'Wednesday' },
    { date: 29, wdId: 4, wdName: 'Thursday' }
  ]
}
 */
// here not default
// ES6 only one default export allowed
export { monthObject, monthArray, weekDaysArray };
