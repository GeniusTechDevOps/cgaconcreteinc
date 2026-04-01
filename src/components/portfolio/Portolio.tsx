import { useState } from "react";

interface PortfolioProps {
  data: any;
}

export default function Portfolio({ data }: PortfolioProps) {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 25;

  const openModal = (index: number) => {
    setCurrentImage(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % data?.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + data.gallery.length) % data?.gallery.length
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentImage((page - 1) * imagesPerPage); // Calcular el índice de la primera imagen en la página
  };

  // Calcular el rango de imágenes para mostrar en la página actual
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = Math.min(
    startIndex + imagesPerPage,
    data.gallery?.length ?? 0
  );

  if (!data.gallery || data.gallery.length === 0) {
    return <div>No hay imágenes para mostrar</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {data?.gallery
          .slice(startIndex, endIndex)
          .map((image: any, index: any) => (
            <div
              className="bg-gray-200 rounded overflow-hidden"
              key={startIndex + index}
              onClick={() => openModal(startIndex + index)}
            >
              <img
                src={image}
                alt={`Gallery image ${startIndex + index}`}
                className="w-[250px] h-[300px] object-cover rounded transition-opacity duration-500 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(data.gallery.length / imagesPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`mx-2 px-3 py-1 rounded-full font-bold text-[24px] w-10 h-10 flex items-center justify-center ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="modal bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full m-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50 flex flex-col">
              <div className="modal-enter relative w-[600px] h-[600px]">
                <img
                  src={data.gallery[currentImage]}
                  alt={data.name}
                  className="w-[600px] h-[600px] object-cover rounded-sm"
                />
                <img
                  src={data.logos.secondary}
                  alt={data.name}
                  className="w-20 h-20 absolute bottom-5 right-5 object-cover opacity-60"
                />
                <button
                  className="absolute top-5 right-5  text-[30px] flex justify-center items-center bg-white w-8 h-8 rounded-full z-50 text-red-500"
                  onClick={closeModal}
                >
                  <i className="fas fa-times"></i>
                </button>

                <button
                  className=" 
                    absolute top-1/2 -translate-y-1/2
                    left-0 text-white font-bold py-2 px-4 rounded
                    bg-primary z-50
                  "
                  onClick={prevImage}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <span
                  className="
                  absolute top-6 left-6 -translate-y-1/2
                  text-white font-bold py-2 px-4 rounded
                  bg-primary z-50
                "
                >
                  {currentImage + 1} / {data.gallery.length}
                </span>
                <button
                  className=" 
                   absolute top-1/2 -translate-y-1/2
                   right-0 text-white font-bold py-2 px-4 rounded
                   bg-primary z-50
                 "
                  onClick={nextImage}
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
