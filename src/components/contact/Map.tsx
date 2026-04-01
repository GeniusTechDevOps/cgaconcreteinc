import { useState } from "react";
import type { RootObject } from "../../interfaces/dbData";

interface Props {
  data: RootObject;
}

const Map = ({ data }: Props) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(
    data.dataGeneral.location[0].urlCity
  );

  const handleCityClick = (urlCity: string) => {
    setSelectedCity(urlCity);
  };

  return (
    <div>
      <div className="md:w-[95%] mx-auto mt-[60px]">
        <div className="w-full mb-10 justify-center gap-2 flex flex-wrap"></div>
      </div>
      <h2
        className="
        md:text-[40px] text-[30px] font-bold text-center bg-primary md:w-[80%] mx-auto md:rounded-t-full text-white md:py-0 py-4 capitalize
        "
      >
        We Cover {data?.milesCover} Miles Around {data?.dataGeneral.location[0].city}
      </h2>
      {/* <div className="md:w-[80%] mx-auto w-[95%] flex flex-wrap justify-center py-4 gap-4">
        {data.dataGeneral.location.map((item, index) => (
          <span
            key={index}
            onClick={() => handleCityClick(item.urlCity)}
            className={`cursor-pointer text-white px-8 py-2 rounded-xl border-white min-w-[200px] max-w-[300px] ${selectedCity === item.urlCity
                ? "bg-primary border-primary"
                : "bg-secondary border-secondary"
              }`}
          >
            <i className="fas fa-map-marker-alt mr-2" aria-hidden="true"></i>
            {item.city}
          </span>
        ))}
      </div> */}
      <div className="relative">
        {selectedCity && (
          <iframe
            src={selectedCity}
            width="600"
            title="Geo Location"
            height="450"
            className="w-full"
            loading="lazy"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Map;
