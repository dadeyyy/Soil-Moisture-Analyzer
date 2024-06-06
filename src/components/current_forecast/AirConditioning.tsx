import Image from "next/image"
import { CurrentWeatherForecast } from "@/lib/types"
const AirConditioning = ({data}: {data: CurrentWeatherForecast}) => {
  return (
    <div
          className="w-full h-full rounded-3xl"
          style={{ background: '#202B3B' }}
        >
          <div className="py-4 px-6 flex flex-col gap-2">
            <h1 className=" opacity-70 font-extrabold">AIR CONDITIONING</h1>
          </div>

          <div className="flex sm:flex-row flex-col justify-evenly items-center py-4 gap-5">
            <div className="flex flex-col justify-start gap-6">
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-3">
                  <Image src={'/air-conditions-icon/temp.png'} width={30} height={30} alt="" />
                  <span className="opacity-60 text-lg font-semibold">
                    Temperature
                  </span>
                </div>
                <span className="pl-10 text-3xl font-medium opacity-90">{data.current.temperature_2m} {data.current_units.temperature_2m}</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-3">
                  <Image src={'/air-conditions-icon/humidity.png'} width={30} height={30} alt="" />
                  <span className="opacity-60 text-lg font-semibold">
                    Humidity
                  </span>
                </div>
                <span className="pl-10 text-3xl font-medium opacity-90">{data.current.relative_humidity_2m}{data.current_units.relative_humidity_2m}</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-3">
                  <Image src={'/air-conditions-icon/precipitation.png'} width={30} height={30} alt="" />
                  <span className="opacity-60 text-lg font-semibold">
                    Precipitation
                  </span>
                </div>
                <span className="pl-10 text-3xl font-medium opacity-90">{data.current.precipitation}{data.current_units.precipitation}</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-3">
                  <Image src={'/air-conditions-icon/rain.png'} width={30} height={30} alt="" />
                  <span className="opacity-60 text-lg font-semibold">
                    Rain
                  </span>
                </div>
                <span className="text-3xl font-medium opacity-90 pl-10">{data.current.rain}{data.current_units.rain}</span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-2">
                  <Image src={'/air-conditions-icon/wind_direction.png'} width={30} height={30} alt="" />
                  <span className="opacity-60 text-lg font-semibold">
                    Wind Direction
                  </span>
                </div>
                <span className="pl-10 text-3xl font-medium opacity-90">{data.current.wind_direction_10m}{data.current_units.wind_direction_10m}</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-3">
                  <Image src={'/air-conditions-icon/wind_speed.png'} width={30} height={30} alt="" />
                  <span className="opacity-60 text-lg font-semibold">
                    Wind Speed
                  </span>
                </div>
                <span className="pl-10 text-3xl font-medium opacity-90">{data.current.wind_speed_10m}{data.current_units.wind_speed_10m}</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AirConditioning