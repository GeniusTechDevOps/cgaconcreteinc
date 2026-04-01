import ButtonContent from "../buttons/Buttons";

interface Props {
  data: any;
}

const Slideshow = ({ data }: Props) => {

  return (
    <>
      <div className="pic-wrapper">
        <figure
          className="pic-1"
          style={{ background: `url("${data.gallery[2]}")` }}
        ></figure>
        <figure
          className="pic-2"
          style={{ background: `url("${data.gallery[3]}")` }}
        ></figure>
        <figure
          className="pic-3"
          style={{ background: `url("${data.gallery[4]}")` }}
        ></figure>
        <figure
          className="pic-4"
          style={{ background: `url("${data.gallery[5]}")` }}
        ></figure>
        <div className="z-[9] relative  mx-auto md:h-[90vh] h-[80vh] flex items-center self-center md:w-[80%] w-[95%] md:flex-row flex-col-reverse md:px-2 px-4 justify-center">
          <div className="md:w-[50%] w-full flex flex-col gap-6 md:text-start text-center justify-center md:items-start items-center">
            <h2
              className="md:text-[50px] text-[30px] font-bold text-white"
              id="modal-title"
            >
               {data.businessLicense
                    ? `${data.businessLicense}`
                    : data.slogan[1]}
            </h2>
            <p className="text-white">{data.valuesContent.mission}</p>
            <ButtonContent
                titleBtn={data?.landingLocations?.[0].description[1].textbutton}
                linkBtn={`tel:+1${data.dataGeneral.phones[0].number}`}
              />
          </div>
          <div className="md:w-[50%] w-full flex-col gap-6 ">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;