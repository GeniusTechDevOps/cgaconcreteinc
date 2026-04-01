import React from "react";
import type { RootObject } from "../../interfaces/dbData";
import ButtonContent from "../buttons/Buttons";

interface CardServicesTwoProps {
  data: RootObject;
}

const CardServicesTwo: React.FC<CardServicesTwoProps> = ({
  data,
}: CardServicesTwoProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
      <div className="col-span-1 lg:col-span-2 bg-white shadow-lg rounded-2xl overflow-hidden p-6 card_services_hover">
        <div className="relative">
          <img
            src={data.services[0].description[0].image}
            alt={data.services[0].title}
            className="w-full md:h-[450px] h-[250px] object-cover rounded-3xl"
          />
          <div
            className="absolute bottom-[-55px] right-6 hexa-img p-1 bg-blue-500 w-28 h-28 flex justify-center items-center bg-opacity-40"
            style={{ background: data.colors.primaryColor }}
          >
            <span className=" icon-tree-services text-white text-[60px]"></span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <h3 className="md:text-[26px] text-[20px] font-bold">
            {data.services[0].title}
          </h3>
          <p className="mt-2">
            {data.services[0].description[0].text.substring(0, 220) + "..."}
          </p>
          <ButtonContent
            linkBtn={`/services/${data.services[0].title
              .toLowerCase()
              .split(" ")
              .join("-")}`}
            titleBtn="View More"
          />
        </div>
      </div>
      <div className="col-span-1 lg:col-span-3 grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-10 ">
        {data.services.slice(1, 5).map((service, index) => (
          <div
            className="col-span-1 bg-white shadow-lg rounded-3xl flex flex-col py-6 card_services_hover px-2"
            key={index}
          >
            <div className="p-4 flex-1">
              <div className="p-1 w-28 h-28 flex justify-center items-center">
                <img
                  src={service.description[0].image}
                  alt={service.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              <h3 className="md:text-[26px] text-[20px] font-bold">
                {service.title}
              </h3>
              <p className="mt-2">
                {service.description[0].text.substring(0, 120) + "..."}
              </p>
            </div>
            <div className="p-4">
              <ButtonContent
                linkBtn={`/services/${service.title
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
                titleBtn="View More"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardServicesTwo;
