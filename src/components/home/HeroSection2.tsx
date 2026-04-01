import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { RootObject, SectionsHomeAbout } from "../../interfaces/dbData";
import Counter from "../global/Counter";
import ButtonContent from "../buttons/Buttons";

interface HeroSection2Props {
  data: RootObject; // Asegúrate de que RootObject está bien definido y accesible.
  blockSection: SectionsHomeAbout[];
}

const HeroSection2: React.FC<HeroSection2Props> = ({ data, blockSection }) => {
  const yearExperiense = data.yearsExperience;
  const miles = data.milesCover;
  const city = data.dataGeneral.location[0].city;

  //como puedo poner lo anterior en un array ? que sea parameter y label

  const dataCounter = [
    {
      label: "Experience",
      subLabel: "Years of",
      parameter: yearExperiense,
    },
    {
      label: city,
      subLabel: "miles around",
      parameter: miles,
    },
    {
      label: "On Time",
      subLabel: "%",
      parameter: 100,
    },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-in relative py-3 lg:py-10">
      <div className="absolute inset-0 w-full h-full">
        {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-75 scale-105 transition-transform duration-700 rounded-2xl" style={{ filter: 'blur(0.5px)' }}>
          <source src="/assets/img/Demolish.mp4" />
        </video> */}
        <img src={data.gallery[0]} alt="bg-img" className="w-full h-full object-cover brightness-75 scale-105 transition-transform duration-700 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent rounded-2xl"></div>
      </div>
      {/* Lado Izquierdo: Video + Info */}
      <div className="relative md:w-1/2 w-full flex items-center justify-center px-2 py-8 md:py-0 min-h-[60vh]">
        {/* Video de fondo */}

        {/* Contenido principal */}
        <div className="relative z-20 flex flex-col gap-6 md:gap-8 w-full max-w-3xl mx-auto p-6 md:p-10 backdrop-blur-sm bg-black/30 rounded-2xl shadow-lg animate-slide-up">
          <div className="border-l-4 border-primary pl-5 mb-2">
            <span className="text-[22px] font-extrabold text-secondary drop-shadow-lg tracking-wide uppercase">
              {data.name}
            </span>
            <h1 className="md:text-[48px] text-[28px] font-black text-white leading-tight drop-shadow-xl mt-2 animate-fade-in">
              {data.slogan[0]}
            </h1>
          </div>
          <p className="text-white/90 text-lg font-medium mb-2 animate-fade-in delay-100">
            {data.valuesContent.mission}
          </p>
          <div className="flex flex-wrap gap-4 mt-2 animate-fade-in delay-200">
            <ButtonContent />
          </div>
          {/* Contadores */}

        </div>
      </div>
      {/* Lado Derecho: Swiper */}
      <div className="relative md:w-1/2 w-full flex flex-col items-center justify-center min-h-[60vh] p-0 md:p-4 animate-fade-in delay-200">
        <div className="w-full h-full flex items-center justify-center">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="rounded-2xl shadow-xl"
          >
            {blockSection[0].additionalImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-[40vh] md:h-[70vh] object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
        <div className="hidden lg:flex flex-row gap-6 -mt-36 animate-fade-in delay-300 relative z-20 w-full px-4">
          {dataCounter.map((item, index) => (
            <div key={index} className="bg-white/10 rounded-xl px-4 py-3 shadow-md hover:scale-105 transition-transform duration-300 w-full md:w-[30%]">
              <Counter
                label={item.label}
                number={Number(item.parameter)}
                subLabel={item.subLabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
