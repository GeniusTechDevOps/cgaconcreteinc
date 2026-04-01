import { useState } from "react";
import type { LandingsGallery } from "../../interfaces/dbData";

interface PortfolioDetailsProps {
  data: LandingsGallery | any;
}

export default function PortfolioDetails({ data }: PortfolioDetailsProps) {
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
    setCurrentImage((prev) => (prev + 1) % data.imgLanding.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + data.imgLanding.length!) % data.imgLanding.length!
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
    data.imgLanding.length!
  );

  return (
    <>
      <div className="flex justify-center w-full">
        <span
          className="
        text-[40px] font-bold mb-6
        "
        >
          {data.nameLanding}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:px-1 px-6">
        {data?.imgLanding
          .slice(startIndex, endIndex)
          .map((image: any, index: any) => (
            <div
              className="bg-gray-200 rounded overflow-hidden md:w-[250px] w-full"
              key={startIndex + index}
              onClick={() => openModal(startIndex + index)}
            >
              <img
                src={image}
                alt={`Gallery image ${startIndex + index}`}
                className="md:w-[250px] w-full h-[300px] object-cover rounded transition-opacity duration-500 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 w-full">
        {Array.from(
          { length: Math.ceil(data.imgLanding.length! / imagesPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`mx-2 px-3 py-1 rounded-lg font-bold text-[24px] ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
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
            <div className="w-full h-[60vh] object-cover rounded relative">
              <img
                src={data.imgLanding[currentImage]}
                alt={`Gallery image ${currentImage}`}
                className="w-full h-[60vh] object-cover rounded"
              />
              <span
                className="close-modal 
                bg-white text-red-500 rounded-full w-8 h-8 flex justify-center items-center
                cursor-pointer absolute top-3 right-3 text-[20px]
                "
                onClick={closeModal}
              >
                X
              </span>
            </div>
            <div className="carousel-controls flex justify-between mt-4 items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={prevImage}
              >
                Prev
              </button>
              <span className="text-gray-700 font-bold text-[22px]">
                {currentImage + 1} / {data.imgLanding.length}
              </span>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={nextImage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
