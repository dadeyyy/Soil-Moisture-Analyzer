export type CurrentWeatherForecast = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    rain: string;
    precipitation: string;
    weather_code: string;
    wind_direction_10m: string;
    wind_speed_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    rain: number,
    precipitation: number;
    wind_direction_10m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
  };
};

type Feed = {
  created_at: string;
  entry_id: number;
  field1: string | null;
};

type Channel = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  field3: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
};

export type SoilMoistureType = {
  channel: Channel;
  feeds: Feed[];
};
