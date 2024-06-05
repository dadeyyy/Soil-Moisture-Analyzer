// HourlyForecastContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HourlyForecastContextType {
  hourlyForecast: any[]; // Update any[] with the appropriate type for hourly forecast data
  updateHourlyForecast: (hourlyForecasts: any[]) => void; // Update any[] with the appropriate type for hourly forecast data
}

const HourlyForecastContext = createContext<HourlyForecastContextType | undefined>(undefined);

export const useHourlyForecast = () => {
  const context = useContext(HourlyForecastContext);
  if (!context) {
    throw new Error('useHourlyForecast must be used within a HourlyForecastProvider');
  }
  return context;
};

interface HourlyForecastProviderProps {
  children: ReactNode;
}

export const HourlyForecastProvider = ({ children }: HourlyForecastProviderProps) => {
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]); // Update any[] with the appropriate type for hourly forecast data

  const updateHourlyForecast = (hourlyForecasts: any[]) => { // Update any[] with the appropriate type for hourly forecast data
    setHourlyForecast(hourlyForecasts);
  };

  const value = {
    hourlyForecast,
    updateHourlyForecast,
  };

  return (
    <HourlyForecastContext.Provider value={value}>
      {children}
    </HourlyForecastContext.Provider>
  );
};
