import React, { useState } from "react";

interface Props {
  data: any;
}

const Modal = ({ data }: Props) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="relative z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                  <div className="pt-5 ">
                    <div className="sm:flex sm:items-start">
                      <button
                        className="absolute top-3 right-3 px-2 rounded-full
                        bg-black transition-all text-white w-10 h-10 flex justify-center items-center
                        "
                        id="modal-title"
                        onClick={() => setShowModal(false)}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                      <div className="w-full flex justify-center item-center mt-[-20px] flex-col  py-4  mb-2">
                        <div className="w-full flex justify-center ">
                          <img
                            src={data.logos.secondary}
                            className="md:w-[50%] w-[70%]"
                            alt="Not Found"
                            loading="lazy"
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2
                    className="text-center text-[30px] font-bold"
                    id="modal-title"
                    style={{
                      color: data.colors.primaryColor,
                    }}
                  >
                    Request An Estimate Now
                  </h2>
                  <div className="" >
                    {/* @ts-ignore */}
                    <form-contact
                      to={data.dataGeneral.emails[0].email}
                      services={
                        // anidarlos con un join
                        data.services
                          .map((service: any) => service.title)
                          .join(",")
                      }
                      server="https://azteca-form-6c17fad78fc4.herokuapp.com/email"
                      img={data.logos.primary}
                      emailcolor="1"
                      isenglish="true"
                    >
                      {/* @ts-ignore */}
                    </form-contact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
