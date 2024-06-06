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
interface WeatherData {
  time: string;
  temperature: number;
  code: number;
  isMorning: number;
  precipitation_probability: number;
}

export function findTimeSlot(apiData: WeatherData[], targetTime: string){
  const targetDateTime = new Date(targetTime.replace('Z', ''));
  const targetMinutes = targetDateTime.getMinutes();

  if (targetMinutes >= 1 && targetMinutes <= 59) {
      const nextHourDateTime = new Date(targetDateTime);
      nextHourDateTime.setHours(nextHourDateTime.getHours() + 1);
      nextHourDateTime.setMinutes(0);
      nextHourDateTime.setSeconds(0);
      nextHourDateTime.setMilliseconds(0);

      // Check if targetTime is on the same date as the next hour
      const targetDate = targetDateTime.toISOString().slice(0, 10); // Extracting only the date part
      const nextHourDate = nextHourDateTime.toISOString().slice(0, 10);
      if (targetDate === nextHourDate) {
          for (let i = 0; i < apiData.length; i++) {
              const dataTime = new Date(apiData[i].time);
              if (dataTime.getTime() === nextHourDateTime.getTime()) {
                  return i;
              }
          }
      }
  } else {
      let nearestIndex: number | undefined = undefined;
      let minDifference = Infinity;
      apiData.forEach((data, index) => {
          const dataTime = new Date(data.time);
          const timeDifference = Math.abs(dataTime.getTime() - targetDateTime.getTime());
          if (timeDifference < minDifference) {
              minDifference = timeDifference;
              nearestIndex = index;
          }
      });
      return nearestIndex;
  }

  return undefined;
}


export function findMaxPrecipitation(hourlyForecast: WeatherData[], startIndex: number) {
  if(startIndex === -1){
    return undefined;
  }
  // Initialize a variable to store the maximum precipitation probability
  let maxPrecipitation = 0;
  let time = ''

  // Loop through the hourlyForecast starting from the specified index
  for (let i = startIndex; i < hourlyForecast.length; i++) {
      const forecast = hourlyForecast[i];
      const precipitationProbability = forecast.precipitation_probability;

      // Update maxPrecipitation if the current precipitation probability is greater
      if (precipitationProbability > maxPrecipitation) {
          maxPrecipitation = precipitationProbability;
          time = forecast.time
      }
  }

  // Return the highest precipitation probability found
  return {time, maxPrecipitation}
}