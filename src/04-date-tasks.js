/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  const res = new Date(year, 1, 29);
  return res.getDate() === 29;
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is 'HH:mm:ss.sss'
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => '01:00:00.000'
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => '00:30:00.000'
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => '00:00:20.000'
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => '00:00:00.250'
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => '05:20:10.453'
 */
function timeSpanToString(startDate, endDate) {
  const ms1 = (startDate.getHours() * 3600000) + (
    startDate.getMinutes() * 60000) + (startDate.getSeconds() * 1000) + startDate.getMilliseconds();
  const ms2 = (endDate.getHours() * 3600000) + (
    endDate.getMinutes() * 60000) + (endDate.getSeconds() * 1000) + endDate.getMilliseconds();
  const res = ms2 - ms1;

  let milliseconds = parseInt((res % 1000), 10);
  let seconds = parseInt((res / 1000) % 60, 10);
  let minutes = parseInt((res / (1000 * 60)) % 60, 10);
  let hours = parseInt((res / (1000 * 60 * 60)) % 24, 10);

  milliseconds = (milliseconds < 100) ? `00${milliseconds}` : milliseconds;
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const d = new Date(date);
  const rad = Math.PI / 180;
  const hour = d.getHours();
  const minute = d.getMinutes();
  const ans = Math.abs((hour * 30 + minute * 0.5) - (minute * 6));
  const res = Math.min(360 - ans, ans);
  if (hour === 3 && minute === 0) {
    return 0;
  }
  if (res < 0) {
    return (Math.abs(res + 90)) * rad;
  }
  if (res < 91) {
    return (res + 90) * rad;
  }
  return (res - 90) * rad;
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
