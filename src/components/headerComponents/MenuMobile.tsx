"use client";
import React, { useState } from "react";
import type { RootObject } from "../../interfaces/dbData";
import Menu from "./Menu";
import ToggleButton from "../global/ToggleButton";

interface MenuMobileProps {
  data: RootObject;
}

const MenuMobile: React.FunctionComponent<MenuMobileProps> = ({
  data,
}: MenuMobileProps) => {
  const [open, setOpen] = useState<boolean>(false);

  //cambiar el estado de Open y guardar en el localstorage
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex  z-[999] w-full">
      <div className="w-full">
        <div
        className="bg-secondary"
        >
          <div className="flex justify-center gap-4 w-full py-4">
            {data.dataGeneral.phones.map((phone: any, index: any) => (
              <a
                key={index}
                href={`tel:+1${phone.number}`}
                className="text-white text-center"
              >
                <i
                  className="fas fa-phone-alt mr-2 bg-white p-2  rounded-lg"
                  style={{
                    color: data.colors.primaryColor,
                  }}
                  aria-hidden="true"
                ></i>
                <span>+1 {phone.number}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col bg-black">
          <div
            className="flex items-start text-center justify-center bg-white"
          >
            <img
              src={
                data.logos.secondary
                  ? data.logos.secondary
                  : "https://via.placeholder.com/150"
              }
              alt="Logo"
              width={130}
              height={120}
              className="w-[300px] flex justify-start text-center py-4 animated-element"
            />
          </div>
          <div className="flex justify-between items-center my-4 self-center w-[80%] mx-auto">
            <i
              className="fas fa-bars text-3xl cursor-pointer text-white p-2 rounded-md"
              style={{ backgroundColor: data.colors.secondaryColor }}
              onClick={handleOpen}
              aria-hidden="true"
            ></i>
            <div className="flex items-center gap-2 ">
              
              <ToggleButton data={data} />
            </div>
          </div>
        </div>

        <div
          className={`top-0 bottom-0 lg:left-0
            ${
              open ? "md:w-[260px] left-0" : "left-[-300px] md:w-[80px]"
            } duration-1000
         w-[300px] overflow-y-auto text-center shadow h-screen z-50 fixed`}
          style={{ backgroundColor: data.colors.primaryColor }}
        >
          <div className="text1 text-xl relative">
            <div className="absolute right-2 top-2">
              <span onClick={handleOpen} className="
              bg-white text-primary rounded-full w-8 h-8 flex justify-center items-center
              "
              >
                X
              </span>
            </div>
            <div className="flex items-center bg-white">
              <div className="w-full bg1  py-4">
                <img
                  src={data.logos.secondary}
                  alt="Logo"
                  width={150}
                  height={100}
                  className="w-auto"
                />
              </div>
            </div>
            <div className="w-full p-2.5 mt-1  flex flex-col justify-start items-start text-gray-200 py-6 px-8 gap-4">
              <Menu
                data={data}
                clickEvent={handleOpen}
                colorText="flex-col"
                styleList="flex-col text-start gap-2 bg2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
