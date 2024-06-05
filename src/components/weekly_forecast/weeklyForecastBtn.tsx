import WeatherIcon from '../icon/WeatherIcon';
import { formatRelativeDate } from '@/lib/utils';
import { formatDateRecent } from '@/lib/utils';
import WeatherIconDays from '../icon/WeatherIconDays';

type SelectedDayBtnProps = {
  data: string;
  arrNumber: number;
  weatherCode: number[];
  isSelected: boolean; // Prop to determine if this button is selected
  onClick: () => void; // Click handler
};

const WeeklyForecastBtn = ({
  weatherCode,
  data,
  arrNumber,
  isSelected,
  onClick,
}: SelectedDayBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={` flex justify-between rounded-lg items-center p-4 ${
        isSelected ? 'bg-gray-500' : ''
      }
    `}
    >
      <span className="text-customColor">
        {formatRelativeDate(new Date(data))}
      </span>
      <WeatherIconDays code={weatherCode[arrNumber]} measure={50} />
      <span className='text-xs opacity-70'>{formatDateRecent(new Date(data)).date}</span>
    </button>
  );
};

export default WeeklyForecastBtn;
