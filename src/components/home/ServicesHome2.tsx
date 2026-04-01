import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import type { DataGeneral, RootObject, Service } from "../../interfaces/dbData";
import FormatText from "../../hooks/FormatText";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import 'react-lazy-load-image-component/src/effects/blur.css';

interface SliderServicesProps {
  dbServices: Service[];
  landingServices: boolean;
  slidesPerView?: number;
  onePage?: boolean;
  dataGeneral?: DataGeneral;
  dataglobal: RootObject;
}

const ServicesHome2: React.FC<SliderServicesProps> = ({
  dbServices,
  landingServices,
  slidesPerView = 3,
  onePage,
  dataGeneral,
  dataglobal,
}) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      spaceBetween={20}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: slidesPerView,
        },
      }}
    >
      {dbServices.map((service, index) => (
        <SwiperSlide key={index} className="flex flex-col items-center">
          <a
            href={`${
              onePage
                ? `tel:${dataGeneral?.phones[0].number}`
                : landingServices
                ? `/services/${FormatText(service.title)}`
                : "/services"
            }`}
            aria-label="Learn More"
            className="rounded-3xl"
          >
            <div className="relative pb-10 group rounded-full">
              <div className="w-full mx-auto z-20 relative rounded-3xl">
                <img
                  src={service.description[0].image}
                  alt={service.title}
                  className="md:w-[450px] w-[300px] md:h-[450px] h-[300px] rounded-3xl object-cover aspect-auto mx-auto border-[10px] border-primary "
                />
                <div className="absolute  w-[75px] h-[75px] flex justify-center items-center overflow-hidden text-2xl  text-secondary  rounded-md top-4 right-[40%] opacity-80 hover:shadow-md transition duration-500 transform z-30">
                  <picture className="w-full h-full rounded-full">
                    <img
                      src={dataglobal?.logos.secondary}
                      alt={`logo ${dataglobal?.name}`}
                      loading="eager"
                      className="w-full h-full object-contain rounded-full"
                      width="200"
                      height="200"
                    />
                  </picture>
                </div>
                <h2
                  className={`font-bold capitalize absolute w-[100%] mx-auto text-white text-center z-20 ${
                    onePage ? "text-xl" : "text-2xl"
                  }`}
                >
                  {service.title}
                </h2>
              </div>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServicesHome2;
