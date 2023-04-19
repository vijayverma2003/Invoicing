import moment from "moment";

export function getMonthsArray() {
  let months = [];
  for (let i = 1; i <= 12; i++)
    months.push(
      `${moment(`2000-${i.toString().padStart(2, "0")}-01`).format(
        "MMM"
      )} ${moment().year()}`
    );

  return months;
}

export function createdThisFinancialYear(date: string) {
  return (
    moment(date).isSameOrAfter(moment(`${moment().year()}-04-01`)) &&
    moment(date).isSameOrBefore(moment(`${moment().year() + 1}-04-01`))
  );
}

export function createdThisMonth(date: string) {
  return (
    moment(date).isSameOrAfter(
      moment(`${moment().year()}-${moment().month()}-01`)
    ) &&
    moment(date).isSameOrBefore(
      moment(`${moment().year()}-${moment().month() + 1}-01`)
    )
  );
}

export function createdToday(date: string) {
  return moment(date).date() === moment().date();
}
