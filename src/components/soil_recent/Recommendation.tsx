'use client';
import WeatherIcon from '../icon/WeatherIcon';
import { useHourlyForecast } from '@/context/ForecastContext';
import { findTimeSlot, findMaxPrecipitation } from '@/lib/utils';
import RainChance from './RainChance';

const Recommendation = ({ created_at, soil_moisture }: { created_at: string, soil_moisture:string }) => {
  const { hourlyForecast } = useHourlyForecast();
  // const index = findTimeSlot(hourlyForecast, '2024-06-16T20:55:51Z');
  // const lastIndex = hourlyForecast.length-1;
  // console.log('Hourly forecast', hourlyForecast);
  // console.log('created_at', created_at);
  // console.log(created_at)

  // 2024-06-16T07:36:33Z
  // 2024-06-16T07:36:33Z
  
  const index = findTimeSlot(hourlyForecast, created_at);
  console.log('Hourly forecast', hourlyForecast)
  console.log("Index ", index)
  const maxPrecipitation = findMaxPrecipitation(hourlyForecast, index || -1);
  

  return (
    <div className="flex flex-col justify-center items-center gap-5 max-w-xs">
    
      <RainChance moisture={soil_moisture} maxPrecipitation={maxPrecipitation}/>

    </div>
  );
};

export default Recommendation;
