/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
export const now = new Date(); // 当前日期
export const nowDayOfWeek = now.getDay(); // 今天本周的第几天
export const nowDay = now.getDate(); // 当前日
export const nowMonth = now.getMonth(); // 当前月
// eslint-disable-next-line import/no-mutable-exports
export let nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
export const lastMonthDate = new Date(); // 上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
export const lastYear = lastMonthDate.getYear();
export const lastMonth = lastMonthDate.getMonth();

// 格式化日期：yyyy-MM-dd
// eslint-disable-next-line consistent-return
export function formatDate(date, type = 1) {
  const myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  const myHours = date.getHours();
  const myMinutes = date.getMinutes();
  const mySeconds = date.getSeconds();
  if (mymonth < 10) {
    mymonth = `0${mymonth}`;
  }
  if (myweekday < 10) {
    myweekday = `0${myweekday}`;
  }

  switch (type) {
    case 1:
      return `${myyear}-${mymonth}-${myweekday}`;
    case 2:
      return `${myyear}-${mymonth}-${myweekday} ${myHours}:${myMinutes}:${mySeconds}`;
    case 3:
      return `${myyear}-${mymonth}-${myweekday} 00:00:00`;
    case 4:
      return `${myyear}-${mymonth}-${myweekday} 23:59:59`;
    default:
      return `${myyear}-${mymonth}-${myweekday}`;
  }
}

// 毫秒数->分秒
export function formatDuring(date) {
  // const days = parseInt(date / (1000 * 60 * s60 * 24))
  // const hours = parseInt((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  // eslint-disable-next-line radix
  const minutes = parseInt((date % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = (date % (1000 * 60)) / 1000;
  return `${minutes} 分 ${seconds.toFixed(0)} 秒 `;
}

// 获得某月的天数
export function getMonthDays(myMonth) {
  const monthStartDate = new Date(nowYear, myMonth, 1);
  const monthEndDate = new Date(nowYear, myMonth + 1, 1);
  const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

// 获得本季度的开始月份
export function getQuarterStartMonth() {
  let quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (nowMonth > 2 && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (nowMonth > 5 && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

// 获得本周的开始日期
export function getWeekStartDate() {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return formatDate(weekStartDate);
}

// 获得本周的结束日期
export function getWeekEndDate() {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  return formatDate(weekEndDate);
}

// 获得上周的开始日期
export function getLastWeekStartDate() {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
  return formatDate(weekStartDate);
}

// 获得上周的结束日期
export function getLastWeekEndDate() {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
  return formatDate(weekEndDate);
}

// 获得本月的开始日期
export function getMonthStartDate() {
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

// 获得本月的结束日期
export function getMonthEndDate() {
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate(monthEndDate);
}

// 获得上月开始时间
export function getLastMonthStartDate() {
  const lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  return formatDate(lastMonthStartDate);
}

// 获得上月结束时间
export function getLastMonthEndDate() {
  const lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  return formatDate(lastMonthEndDate);
}

// 获得本季度的开始日期
export function getQuarterStartDate() {
  const quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}

// 获得本季度的结束日期
export function getQuarterEndDate() {
  const quarterEndMonth = getQuarterStartMonth() + 2;
  const quarterStartDate = new Date(nowYear, quarterEndMonth,
    getMonthDays(quarterEndMonth));
  return formatDate(quarterStartDate);
}
