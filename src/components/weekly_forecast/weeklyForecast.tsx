'use client';

import { useState, useEffect } from 'react';
import { useHourlyForecast } from '@/context/ForecastContext';
import { isMorningOrNight } from '@/lib/utils';
import { CurrentWeatherForecast } from '@/lib/types';
import WeeklyForecastBtn from './weeklyForecastBtn';

const WeeklyForecast = ({ data }: { data: CurrentWeatherForecast }) => {
  const weatherCode = data.daily.weather_code;
  const [selectedDate, setSelectedDate] = useState(data.daily.time[0]);
  const { hourlyForecast, updateHourlyForecast } = useHourlyForecast(); // Use the context hook to access hourly forecast data and update function

  useEffect(() => {
    // Set the initial value of hourlyForecast to the first 24 data points
    const first24HourlyForecasts = data.hourly.time
      .slice(0, 24)
      .map((hourlyTime, index) => ({
        time: hourlyTime,
        temperature: data.hourly.temperature_2m[index],
        code: data.hourly.weather_code[index],
        isMorning: isMorningOrNight(hourlyTime),
        precipitation_probability: data.hourly.precipitation_probability[index]
      }));

    updateHourlyForecast(first24HourlyForecasts); // Update the hourly forecast using the context function
  }, []); // Include dependencies for useEffect

  const handleDayClick = (day: string) => {
    setSelectedDate(day); // Update selectedDay when a button is clicked
    
    // Filter hourly forecasts based on the selected date
    const hourlyForecasts = data.hourly.time.reduce(
      (acc: any, hourlyTime: string, index: number) => {
        if (hourlyTime.startsWith(day)) {
          acc.push({
            time: hourlyTime,
            temperature: data.hourly.temperature_2m[index],
            code: data.hourly.weather_code[index],
            isMorning: isMorningOrNight(hourlyTime),
            precipitation_probability: data.hourly.precipitation_probability[index]
          });
        }
        return acc;
      },
      []
    );

    // Set the filtered hourly forecasts using the context function
    updateHourlyForecast(hourlyForecasts);

  };

  return (
    <section
      className="flex flex-col rounded-3xl w-auto p-8 gap-8 sm:w-1/3"
      style={{ background: '#202B3B' }}
    >
      <span className="font-semibold text-customColor">7-DAY FORECAST</span>

      <div className="flex flex-col gap-8 ">
        {data.daily.time.map((data, index) => (
          <WeeklyForecastBtn
            weatherCode={weatherCode}
            data={data}
            arrNumber={index}
            key={index}
            isSelected={selectedDate === data}
            onClick={() => handleDayClick(data)}
          />
        ))}
      </div>
    </section>
  );
};

export default WeeklyForecast;
