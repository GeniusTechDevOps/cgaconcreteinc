import UseTextHidden from "../../hooks/UseTextHidden";

interface DirectoriosProps {
  data: any;
}

const Directorios: React.FC<DirectoriosProps> = ({
  data,
}: DirectoriosProps) => {
  return (
    <div className="md:py-10 py-16 md:w-[70%] mx-auto w-full md:mb-[200px]">
      {data.gmb && (
        <div className="flex items-center gap-6 justify-center md:flex-row flex-col">
          <div className="flex flex-col">
            <h2 className="md:text-[45px] text-[30px] font-bold text-center text-gray-800">
              Leave a review
            </h2>
            <div className="flex items-center gap-2 justify-center text-4xl text-center text-gray-800">
              <i className="fas fa-star text-orange-500"></i>
              <i className="fas fa-star text-orange-500"></i>
              <i className="fas fa-star text-orange-500"></i>
              <i className="fas fa-star text-orange-500"></i>
              <i className="fas fa-star text-orange-500"></i>
            </div>
          </div>
          <div className="md:flex items-center gap-2 justify-center text-4xl hidden">
            {/* Arrow */}
            <i className="fas fa-chevron-right md:block hidden"></i>
          </div>
          <div className="flex items-center gap-2 justify-center text-4xl md:hidden">
            {/* Arrow */}
            <i className="fas fa-chevron-down md:hidden block"></i>
          </div>
          <div>
            <a
              href={data.gmb}
              target="_blank"
              rel="noreferrer"
              aria-label="Google My Business"
            >
              <img
                src="/assets/img/GMB.webp"
                alt="Google My Business"
                className="w-[250px] h-[250px] object-contain object-center transition-all duration-300 ease-in-out transform hover:scale-105"
              />
            </a>
          </div>
        </div>
      )}
      {
        (data.redesSociales.length || data.directorios.length) > 0 && (
          <div>
            <h2 className="md:text-[45px] text-[30px] font-bold text-center text-gray-800">
              <UseTextHidden text="Find Us On" />
            </h2>
          </div>
        )
      }
      <div className="flex flex-wrap justify-center items-center gap-4">
        {/* Mapeo de redesSociales */}
        {data.redesSociales.map((item: any, index: any) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="md:w-[260px] w-[150px] h-[100px] flex justify-center items-center bg-white transition-all duration-300 ease-in-out transform hover:scale-105 logo-container"
            key={index}
            aria-label={item.name}
          >
            <img
              src={item.logo}
              alt={item.name}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </a>
        ))}

        {/* Mapeo de directorios */}
        {data.directorios.map((item: any, index: any) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="md:w-[260px] w-[150px] h-[100px] flex justify-center items-center bg-white transition-all duration-300 ease-in-out transform hover:scale-105 logo-container"
            key={index} // Asegúrate de que la clave sea única en todo el conjunto de datos
            aria-label={item.name}
          >
            <img
              src={item.logo}
              alt={item.name}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Directorios;
