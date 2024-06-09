import Image from 'next/image';
import { SoilMoistureType } from '@/lib/types';
import { formatDateRecent } from '@/lib/utils';
import { CurrentWeatherForecast } from '@/lib/types';
import WeeklyForecast from '@/components/weekly_forecast/weeklyForecast';
import HourlyForecast from '@/components/hourly_forecast/hourlyForecast';
import AirConditioning from '@/components/current_forecast/AirConditioning';
import SoilMoistureRecent from '@/components/soil_recent/SoilMoistureRecent';
import SoilMoistureHistory from '@/components/soil-moisture/SoilMoistureHistory';

const getRecentMoistureData = async () => {
  const res = await fetch(
    'https://api.thingspeak.com/channels/2562479/fields/1.json', {cache: 'no-store'}
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recent soil moisture data');
  }

  return res.json();
};
async function getData() {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=14.6799&longitude=120.5421&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,apparent_temperature_max,apparent_temperature_min&timezone=Asia%2FSingapore', {cache: 'no-store'}
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const recentData = (await getRecentMoistureData()) as SoilMoistureType;
  const lastFeed = recentData.feeds[recentData.feeds.length - 1];
  const data = (await getData()) as CurrentWeatherForecast;
  

  return (
    <main
      className="bg-cover bg-center sm:h-screen text-white flex flex-col sm:flex-row p-8 gap-10"
      style={{ background: '#0B121C' }}
    >
      <link
        rel="icon"
        href="/soil.png"
        type="image/<generated>"
        sizes="<generated>"
      />
      <section
        className=" flex flex-row sm:flex-col justify-center items-center sm:justify-start sm:items-stretch gap-0 sm:gap-20 rounded-3xl  sm:py-6"
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

        <div className="flex justify-center items-center sm:w-full">
          <SoilMoistureHistory soilMoistureData={recentData} />
        </div>
      </section>

      <section className="flex flex-col w-full sm:w-2/3">
        <div
          className="px-5 py-4 rounded-2xl"
          style={{ background: '#202B3B' }}
        >
          <span className="font-bold tracking-wider opacity-70">
            BALANGA CITY, BATAAN
          </span>
        </div>

        <SoilMoistureRecent recentData={lastFeed} weatherData={data} />

        <HourlyForecast />

        <AirConditioning data={data} />
      </section>

      <WeeklyForecast data={data} />
    </main>
  );
}
