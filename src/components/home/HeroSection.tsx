import { useEffect, useState } from "react";
import type { RootObject } from "../../interfaces/dbData";
import ButtonContent from "../buttons/Buttons";

interface Props {
  data: RootObject;
}

export default function HeroSection({ data }: Props) {
  const [currentImages, setCurrentImages] = useState([
    data.gallery[0],
    data.gallery[1],
    data.gallery[2],
    data.gallery[3],
  ]);

  // Añade un estado para manejar la recarga de animaciones
  const [loadAnimation, setLoadAnimation] = useState(false);

  const changeImages = () => {
    let newImages: string[] = [];
    while (newImages.length < 4) {
      const randomImage =
        data.gallery[Math.floor(Math.random() * data.gallery.length)];
      if (!newImages.includes(randomImage)) {
        newImages.push(randomImage);
      }
    }
    setCurrentImages(newImages);
    setLoadAnimation(true);
    setTimeout(() => setLoadAnimation(false), 500); // Restablece la animación después de 0.5s
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeImages();
    }, 9000); // Cambia las imágenes cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden md:py-14 py-4">
        <div className="container px-4 mx-auto mt-12">
          <div className="flex flex-wrap items-center -mx-4 md:flex-row flex-col-reverse">
            <div className="w-auto px-4 mb-4 text-center ">
              <button
                className="hidden p-2 rounded-full  lg:inline-block text-gray-50"
                onClick={() => changeImages()}
                style={{ backgroundColor: data.colors.secondaryColor }}
                name="next_btn"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-4 h-4 bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="w-full px-4 lg:w-2/5">
              <div className=" lg:max-w-xl">
                <span
                  className="inline-block px-6 py-1 mb-4 text-[20px] tracking-wider text-white uppercase rounded-full font-bold"
                  style={{ backgroundColor: data.colors.primaryColor }}
                >
                  {data.name}
                </span>
                <h1 className="mb-6 text-4xl font-bold lg:text-6xl">
                  {data.businessLicense
                    ? `We Are Licensed ${data.businessLicense}`
                    : data.slogan[1]}
                </h1>
                <p className="mb-6 leading-8 text-gray-500 ">
                  {data.valuesContent.vision}
                </p>
                <ButtonContent
                 
                />
              </div>
            </div>
            <div className="w-full px-4 mt-20 lg:w-2/5 lg:mt-0">
              <div className="flex justify-center lg:justify-end">
                <div className="mr-4 lg:mr-8">
                  {currentImages.slice(0, 2).map((img, index) => (
                    <img
                      key={index}
                      className={`block object-cover md:w-[260px] w-[200px] h-32 mx-auto mb-8 rounded-md sm:h-64 ${
                        loadAnimation ? "zoom-in-animation" : ""
                      }`}
                      src={img}
                      alt={data.name}
                      loading="eager"
                    />
                  ))}
                </div>
                <div>
                  {currentImages.slice(2, 4).map((img, index) => (
                    <img
                      key={index}
                      className={`block object-cover md:w-[260px] w-[200px] h-32 mx-auto mb-8 rounded-md sm:h-64 ${
                        loadAnimation ? "zoom-in-animation" : ""
                      }`}
                      src={img}
                      alt={data.name}
                      loading="eager"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-auto px-4 mb-4 text-center xl:mb-0">
              <button
                className="hidden p-2 rounded-full lg:inline-block text-gray-50"
                onClick={() => changeImages()}
                style={{ backgroundColor: data.colors.secondaryColor }}
                name="prev_btn"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
