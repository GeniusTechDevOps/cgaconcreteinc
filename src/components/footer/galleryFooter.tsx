import { useState } from "react";
import type { RootObject } from "../../interfaces/dbData";

interface GalleryFooterProps {
  data: RootObject;
}

const GalleryFooter: React.FC<GalleryFooterProps> = ({ data }) => {
  const [openModalImage, setOpenModalImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModalImage(true);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        {data.gallery.slice(0, 8).map((image, index) => (
          <div
            key={index}
            className="relative w-[100px] h-[100px] overflow-hidden image-container rounded-md"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              alt={data.name}
              className="w-full h-full object-cover"
            />
            <div className="hover-background">
              <i className="fas fa-search-plus absolute top-2 right-2 text-white text-lg"></i>
            </div>
          </div>
        ))}
      </div>

      {openModalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setOpenModalImage(false)}
        >
          <div className="modal-enter relative w-[600px] h-[600px]">
            <img
              src={selectedImage ?? ""}
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
              onClick={() => setOpenModalImage(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryFooter;
