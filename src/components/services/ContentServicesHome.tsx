import UseTextHidden from "../../hooks/UseTextHidden";
import type { RootObject } from "../../interfaces/dbData";
import CardServicesTwo from "./CardServicesTwo";

interface ContentServicesHomeProps {
    data: RootObject;
}

const ContentServicesHome: React.FC<ContentServicesHomeProps> = (
    { data }: ContentServicesHomeProps
) => {
  return (
    <div className="w-full">
      <div className="md:w-[70%] mx-auto w-[95%] md:py-24 py-4">
        <div className="flex justify-center flex-col items-center mb-6 text-center">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold"><UseTextHidden text="Our Services"/></span>
          </div>
          <h2 className="text-3xl font-bold">
            We Provide The Necessary Services To You
          </h2>
        </div>

        <div className="py-4">
          <CardServicesTwo data={data} />
        </div>
      </div>
    </div>
  );
};

export default ContentServicesHome;
