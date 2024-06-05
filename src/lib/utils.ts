import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRecent(date: Date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octover',
    'November',
    'December',
  ];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  const time = hours + ':' + minutes + ' ' + ampm;

  return { time: `${time}`, date: `${month} ${day}, ${year}` };
}

export function formatDate(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? Number('0' + minutes) : minutes; // Convert minutes to number if necessary
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (
    date.getMonth() +
    1 +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    '  ' +
    strTime
  );
}

export function formatRelativeDate(inputDate: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  const dayAfterTomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  if (isSameDay(inputDate, today)) {
    return 'Today';
  } else {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return daysOfWeek[inputDate.getDay()];
  }
}


export function isMorningOrNight(dateString: string){
  const date = new Date(dateString);
  const hours = date.getHours();
  if (hours >= 6 && hours < 17) {
      return 1;
  } else {
      return 0;
  }
}


export const time = [
  '2024-06-05T00:00',
  '2024-06-05T01:00',
  '2024-06-05T02:00',
  '2024-06-05T03:00',
  '2024-06-05T04:00',
  '2024-06-05T05:00',
  '2024-06-05T06:00',
  '2024-06-05T07:00',
  '2024-06-05T08:00',
  '2024-06-05T09:00',
  '2024-06-05T10:00',
  '2024-06-05T11:00',
  '2024-06-05T12:00',
  '2024-06-05T13:00',
  '2024-06-05T14:00',
  '2024-06-05T15:00',
  '2024-06-05T16:00',
  '2024-06-05T17:00',
  '2024-06-05T18:00',
  '2024-06-05T19:00',
  '2024-06-05T20:00',
  '2024-06-05T21:00',
  '2024-06-05T22:00',
  '2024-06-05T23:00',
];
