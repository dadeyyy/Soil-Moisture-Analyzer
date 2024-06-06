'use client';
import WeatherIcon from '../icon/WeatherIcon';
import { useHourlyForecast } from '@/context/ForecastContext';
import { findTimeSlot, findMaxPrecipitation } from '@/lib/utils';
import RainChance from './RainChance';

const Recommendation = ({ created_at, soil_moisture }: { created_at: string, soil_moisture:string }) => {
  const { hourlyForecast } = useHourlyForecast();
  const index = findTimeSlot(hourlyForecast, '2024-06-06T14:55:51Z');
  const maxPrecipitation = findMaxPrecipitation(hourlyForecast, index || -1);
  console.log("Max precipitation", maxPrecipitation)
  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      

      <RainChance moisture={soil_moisture} maxPrecipitation={maxPrecipitation}/>

    </div>
  );
};

export default Recommendation;
