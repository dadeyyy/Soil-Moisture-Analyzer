'use client'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useHourlyForecast } from '@/context/ForecastContext';

import { formatDateRecent } from '@/lib/utils';
import Image from 'next/image';
import WeatherIcon from '../icon/WeatherIcon';

const HourlyForecast = () => {
   const {hourlyForecast} =  useHourlyForecast();


  return (
    <div className="rounded-3xl mb-5" style={{ background: '#202B3B' }}>
          <div className="py-4 px-6 flex flex-col gap-2">
            <h1 className=" opacity-70 font-extrabold">HOURLY FORECAST</h1>
          </div>

          <ScrollArea className="whitespace-nowrap w-full">
            <div className="flex p-2 gap-2 text-sm">
              {hourlyForecast.map((data) => (
                <div
                  key={data.time}
                  className="flex flex-col justify-center items-center hover:bg-slate-500 py-4 px-8 hover:rounded-2xl gap-3 border-r-2"
                  style={{ borderColor: '#555D69' }}
                >
                  <span className="opacity-70 font-semibold">
                    {formatDateRecent(new Date(data.time)).time}
                  </span>
                  <WeatherIcon isDay={data.isMorning} code={data.code} measure={50}/>
                  <span className="text-2xl">{data.temperature}</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
  )
}

export default HourlyForecast