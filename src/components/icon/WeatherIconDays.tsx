import Image from "next/image";

const WeatherIconDays = ({code, measure}: {code: number, measure: number}) => {
  if(code >= 0 && code <=10){
    return <Image src={'/air-conditions-icon/sunsun.png'} height={measure} width={measure} alt="sunny-icon"/>
  }
  else if(code >= 11 && code <=49){
    return <Image src={'/cloudy-icon.png'} height={measure} width={measure} alt="cloudy-icon"/>
  }
  else if(code >= 50 && code <=79){
    return <Image src={'/rain-icon.png'} height={measure} width={measure} alt="rain-icon"/>
  }
  else if(code >= 80 && code <=99){
    return <Image src={'/storm-icon.png'} height={measure} width={measure} alt="storm-icon"/>
  }
}

export default WeatherIconDays