import React from "react";
import VideosPlayContent from "./VideosPlayContent";
import ButtonContent from "../../buttons/Buttons";

interface VideoAnimadoProps {
    data: any;
}

const VideoAnimado: React.FC<VideoAnimadoProps> = (
    { data }: VideoAnimadoProps
) => {
  

  return (
    <div className="flex justify-center flex-col items-center my-10 z-10">
      <h2 className="text-white text-center
      md:text-[55px] text-[30px] font-bold py-4
      ">{data.slogan[0]}</h2>
      <ButtonContent
    linkBtn={`tel:+1${data.dataGeneral.phones[0].number}`}
  />
      {data.videoAnimado.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className="md:w-[800px] md:h-[450px] w-full h-[200px] shadow-xl rounded-3xl"
          >
            <VideosPlayContent videoUrl={item.urlVideo} />
          </div>
        );
      })}
    </div>
  );
};

export default VideoAnimado;
