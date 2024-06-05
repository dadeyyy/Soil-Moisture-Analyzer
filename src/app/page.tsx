import Image from 'next/image';

import { formatDate, time, formatDateRecent } from '@/lib/utils';
import { isMorningOrNight } from '@/lib/utils';
import { CurrentWeatherForecast } from '@/lib/types';
import WeeklyForecast from '@/components/weekly_forecast/weeklyForecast';
import HourlyForecast from '@/components/hourly_forecast/hourlyForecast';
import WeatherIcon from '@/components/icon/WeatherIcon';
import WeatherIconDays from '@/components/icon/WeatherIconDays';
import AirConditioning from '@/components/current_forecast/AirConditioning';

async function getData() {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=14.6799&longitude=120.5421&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,apparent_temperature_max,apparent_temperature_min&timezone=Asia%2FSingapore', {cache: 'no-store'}
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = (await getData()) as CurrentWeatherForecast;

  const date = formatDateRecent(new Date(data.current.time));
  return (
    <main
      className="bg-cover bg-center sm:h-screen text-white flex flex-col sm:flex-row p-8 gap-10"
      style={{ background: '#0B121C' }}
    >
      <section
        className=" flex flex-row sm:flex-col gap-20 p-6 rounded-3xl"
        style={{ background: '#202B3B' }}
      >
        <div className="flex justify-center items-center">
          <Image
            className="hidden sm:block"
            src={'/icon.png'}
            width={35}
            height={35}
            alt="icon"
          />
        </div>

        <div className="flex flex-row sm:flex-col w-full gap-10 sm:gap-0">
          <div className="flex flex-col justify-center items-center gap-2">
            <div></div>
            <Image src={'/weather.png'} width={35} height={35} alt="weather" />
            <span className="text-xs">Weather</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div></div>
            <Image src={'/reco.png'} width={35} height={35} alt="reco" />
            <span className="text-xs">Analyzer</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full sm:w-2/3">
        <div
          className="px-5 py-4 rounded-2xl"
          style={{ background: '#202B3B' }}
        >
          <span className="font-bold tracking-wider opacity-70">
            WEATHER FORECAST
          </span>
        </div>

        <div className="flex sm:flex-row flex-col gap-5 text-center sm:text-left justify-between items-center p-10 mb-5">
          <div className="flex flex-col gap-10 order-2 sm:order-1">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-medium">Balanga City</h1>
              <span style={{ color: '#555D69' }}>
                {date.date} {date.time}
              </span>
            </div>
            <span className="text-8xl font-normal">
              {data.current.temperature_2m}
            </span>
          </div>

          <div className='sm:order-2 order-1'>
            
            <WeatherIcon isDay={isMorningOrNight(data.current.time)} code={data.current.weather_code} measure={200}/>
          </div>
        </div>

        <HourlyForecast/>

        <AirConditioning data={data}/>
      </section>

      <WeeklyForecast data={data} />
    </main>
  );
}
