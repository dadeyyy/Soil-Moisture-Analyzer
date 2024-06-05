import Image from "next/image"

const WeatherIcon = ({code, measure, isDay}: {code: number, measure: number, isDay: number}) => {

  if(code >= 0 && code <=10){
    if(isDay === 1){
      return <Image src={'/air-conditions-icon/sunsun.png'} height={measure} width={measure} alt="sunny-icon"/>
    }
    return <Image src={'/air-conditions-icon/moon.png'} height={measure} width={measure} alt="moon-icon"/>
  }
  else if(code >= 11 && code <=49){
    if(isDay === 1){

      return <Image src={'/cloudy-icon.png'} height={measure} width={measure} alt="cloudy-icon"/>
    }
    return <Image src={'/air-conditions-icon/cloudy-night.png'} height={measure} width={measure} alt="cloudy-night"/>
  }
  else if(code >= 50 && code <=79){
    if(isDay === 1){
      return <Image src={'/rain-icon.png'} height={measure} width={measure} alt="rain-icon"/>
    }
    return <Image src={'/air-conditions-icon/rainy-night.png'} height={measure} width={measure} alt="rainy-night"/>
  }
  else if(code >= 80 && code <=99){
    if(isDay === 1){

      return <Image src={'/storm-icon.png'} height={measure} width={measure} alt="storm-icon"/>
    }
    return <Image src={'/air-conditions-icon/stormy-night.png'} height={measure} width={measure} alt="stormy-night"/>
  }
}

export default WeatherIcon