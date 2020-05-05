class DateHelper {
  static getMonthInterval(previousMonthIndex = 1) {
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - previousMonthIndex);

    const lastDayOfMonth = new Date();
    const x = previousMonthIndex - 1;
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() - x);
    lastDayOfMonth.setDate(1);
    lastDayOfMonth.setHours(-1);

    return { firstDayOfMonth, lastDayOfMonth };
  }
  static getMonthName(monthNumber) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber];
  }
}

export default DateHelper;
