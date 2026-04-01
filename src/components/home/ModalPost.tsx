import React, { useState } from "react";

const ModalPost = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="relative z-[999]"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-20 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                  <div className="">
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
                      <div className="w-full flex justify-center item-center flex-col">
                        <div className="">
                          <img
                            src="post/post.jpg"
                            alt="Not Found"
                            loading="lazy"
                            className="w-full object-contain"
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>
                    </div>
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

export default ModalPost;