export const formatIsoToDate = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return `${day}/${month}/${year}`;
}

export const numberWithSpace = (x: number) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ""
}