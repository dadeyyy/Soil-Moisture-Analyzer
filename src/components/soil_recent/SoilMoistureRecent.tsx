import WeatherIcon from '../icon/WeatherIcon';
import { formatDateRecent, isMorningOrNight } from '@/lib/utils';
import { CurrentWeatherForecast } from '@/lib/types';
import Recommendation from './Recommendation';
import { recentData } from '@/lib/types';
import RefreshBtn from './RefreshBtn';

const SoilMoistureRecent = async ({
  weatherData,
  recentData,
}: {
  weatherData: CurrentWeatherForecast;
  recentData: recentData;
}) => {
  const date = formatDateRecent(new Date(recentData.created_at));

  return (
    <div className="flex sm:flex-row flex-col gap-5 text-center justify-between sm:text-left items-start p-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-medium">Soil Moisture Content:</h1>
          <span style={{ color: '#555D69' }}>
            {date.date} {date.time}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start gap-3">
          <span className="text-8xl font-normal">{recentData.field1} %</span>
          <RefreshBtn />
        </div>
      </div>

      <Recommendation
        soil_moisture={recentData.field1}
        created_at={recentData.created_at}
      />
    </div>
  );
};

export default SoilMoistureRecent;
