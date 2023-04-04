export const date = (date: string | number) => {
  const dateValue = new Date(date);

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const month = months[dateValue.getMonth()];
  const year = dateValue.getFullYear();
  const day = dateValue.getDate();
  const timeHours = dateValue.getHours();
  const timeMinutes = dateValue.getMinutes();

  return `${day <= 9  ? '0' : ''}${day}.${month}.${year} в ${timeHours <= 9 ? '0' : ''}${timeHours}:${timeMinutes <= 9  ? '0' : ''}${timeMinutes}`;
};