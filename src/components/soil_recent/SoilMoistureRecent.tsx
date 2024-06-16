import WeatherIcon from '../icon/WeatherIcon';
import { formatDateRecent, isMorningOrNight } from '@/lib/utils';
import { CurrentWeatherForecast } from '@/lib/types';
import Recommendation from './Recommendation';
import { recentData } from '@/lib/types';

const SoilMoistureRecent = async ({
  weatherData,
  recentData,
}: {
  weatherData: CurrentWeatherForecast;
  recentData: recentData;
}) => {
  const date = formatDateRecent(new Date(recentData.created_at));
  // console.log(date)
  return (
    <div className="flex sm:flex-row flex-col gap-5 text-center justify-between sm:text-left items-start p-10 mb-2">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-medium">Soil Moisture Content:</h1>
          <span style={{ color: '#555D69' }}>
            {date.date} {date.time}
          </span>
        </div>
        <span className="text-8xl font-normal">{recentData.field1} %</span>
      </div>

      <Recommendation
        soil_moisture={recentData.field1}
        created_at={recentData.created_at}
      />
    </div>
  );
};

export default SoilMoistureRecent;
