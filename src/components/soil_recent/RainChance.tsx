import { formatDateRecent } from '@/lib/utils';

type MaxPrecipitationType = {
  time: string; // Remove the quotes around 'string'
  maxPrecipitation: number;
};

interface RainChanceProps {
  maxPrecipitation?: MaxPrecipitationType; // Add undefined option here
  moisture: string;
}

const RainChance = ({ maxPrecipitation, moisture }: RainChanceProps) => {
  const moistureInt = parseInt(moisture);
  const maxPrec = maxPrecipitation?.maxPrecipitation;

    
  if (maxPrec === undefined) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium opacity-70 ">Recommendation</h1>


      {maxPrecipitation !== undefined && (
          <span className="flex flex-col justify-center text-lg">
          Chance of rain: {maxPrec}% at{' '}
          {formatDateRecent(new Date(maxPrecipitation?.time)).time}
        </span>
      )}
      {(moistureInt >= 0 && moistureInt <=39) && (maxPrec >= 0 && maxPrec <=69) && 
      (
        <div className="flex flex-col gap-3">
          <span className="opacity-70">Low Moisture Content</span>
          <span className="text-lg">Irrigate the crop for more adequate crop health and growth.</span>
        </div>
      )}

        {(moistureInt >= 0 && moistureInt <=39) && (maxPrec >= 70) && 
      (
        <div className="flex flex-col gap-3">
          <span className="opacity-70">Low Moisture Content</span>
          <span className="text-lg font-semibold">You can choose not to irrigate <br/> the crop because high chance of rain is expected.</span>
        </div>
      )}


      {(moistureInt >= 40 && moistureInt <= 59) && (maxPrec > 0) && (
        <div className="flex flex-col gap-3">
          <span className="opacity-70">Optimal Moisture Content</span>

          <span className="text-lg">You can choose not to irrigate the <br/> crop for it has sufficient moisture content.</span>
        </div>
      )}
      {(moistureInt >= 60 && moistureInt <= 100)&& (
        <div className="flex flex-col gap-3">
          <span className="opacity-70">High Moisture Content</span>
          {maxPrec >= 70 && (
            <span className='text-red-500'>
              Warning: The crop may suffer from too much water on the soil.
            </span>
          )}
          <span className="text-lg">The crop does not need irrigation for <br/> it has above desired moisture content. </span>
        </div>
      )}
    </div>
  );
};

export default RainChance;
