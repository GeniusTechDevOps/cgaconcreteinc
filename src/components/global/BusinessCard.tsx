import { useState } from "react";
import type { RootObject } from "../../interfaces/dbData";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import UseTextHidden from "../../hooks/UseTextHidden";

interface BusinessCardProps {
    data: RootObject;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ data }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [sendInput, setSendInput] = useState("");
    const [active, setActive] = useState(false);

    const handleImageFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const sendWhatsapp = () => {
        const relmsg = sendInput.replace(/ /g, "%20");
        const phone = data.dataGeneral.phones[0].number
            .replace("-", "")
            .replace("-", "");

        window.open(`https://wa.me/1${phone}?text=` + relmsg, "_blank");
        setSendInput("");
        setActive(false);
    };
    return (
        <section className="w-full h-auto py-10">
            <div className="relative bottom-0 left-0 right-0 flex justify-center items-center p-2">

                {/* <motion.button
                    className=" bg-secondary rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 p-3 text-white font-bold"
                    onClick={() => handleImageFlip()}
                    whileHover={{ scale: 1.05 }}
                    title="ver imagen"
                >
                    {isFlipped ? "Front" : "Back"}

                </motion.button> */}
            </div>
            <div>
                {
                    isFlipped ? (
                        <motion.div
                            className="w-full md:w-[660px] h-auto md:h-[360px] border mx-auto relative bg-white overflow-hidden rounded-lg flex flex-col md:flex-row justify-end items-center py-5 pl-3"
                            initial={{ opacity: 0, rotateY: isFlipped ? 180 : 0, scaleX: isFlipped ? 1 : -1 }}
                            animate={{ opacity: 1, rotateY: isFlipped ? 0 : 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-[380px] md:w-[480px] h-[480px] md:h-[480px] absolute -right-36 md:-right-44 rounded-[5rem] bg-gradient-to-tr from-primary to-secondary rotate-[35deg] md:rotate-45 z-30 block border-0 md:border-[2.8rem] border-secondary bottom-4 md:-bottom-14">

                            </div>
                            <div className="-scale-x-100 w-full md:w-3/4 h-[60px] bg-gradient-to-r from-primary md:from-secondary to-transparent via-primary md:via-secondary  absolute bottom-0 md:bottom-12 -left-8 md:-left-10 rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-2xl z-50 md:z-20 flex justify-start md:justify-start items-center pl-6 md:pl-32">
                                <a href="/" className="relative text-base font-semibold capitalize text-white flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 hover:text-white">
                                    <i className="fa-regular fa-globe text-base"></i>
                                    {data.domain}
                                </a>
                            </div>


                            <div className="w-full md:w-2/5 h-full flex flex-col justify-start items-center relative z-50 gap-3">
                                <div className="w-full h-auto rounded-2xl -mt-5">
                                    <img src={data.logos.secondary} alt="logo" className="object-contain w-11/12 h-full -scale-x-100 mx-auto" />
                                </div>
                                <div className="w-3/5 p-1 bg-white rounded-3xl text-base text-primary -scale-x-100 text-center">
                                    <button onClick={() => sendWhatsapp()}>

                                        <span className="text-base font-semibold"><i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp</span>
                                    </button>
                                </div>

                            </div>
                            <div className="w-full md:w-3/5 h-full flex flex-col justify-center items-start -scale-x-100 px-0 md:px-2 py-3 relative z-50 pb-20 md:pb-0">
                                <h2 className="text-lg md:text-2xl font-black text-white md:text-white text-end px-2 py-2">
                                    <UseTextHidden text="Our Services:" />
                                </h2>
                                {
                                    data.services.slice(0, 6).map((service, index) => (
                                        <a href={`tel:+1${data.dataGeneral.phones[0].number}`} className=" flex justify-center items-center gap-1 text-white mb-2 ml-4 hover:scale-105 transition-all duration-300 hover:text-slate-100" key={index}>
                                            <i className={`fa-solid fa-chevron-right text-base`}></i>
                                            <p key={index} className="text-base font-semibold text-end px-2 py-1">
                                                {service.title}
                                            </p>
                                        </a>
                                    ))
                                }
                            </div>

                        </motion.div>
                    )
                        : (
                            <motion.div
                                className="w-full md:w-[760px] h-auto md:h-[360px] border mx-auto relative bg-white overflow-hidden rounded-lg flex flex-col md:flex-row justify-center items-center py-5 pl-2"
                                initial={{ opacity: 0, rotateY: isFlipped ? 180 : 0, scaleX: isFlipped ? 1 : -1 }}
                                animate={{ opacity: 1, rotateY: isFlipped ? 0 : 180 }}
                                transition={{ duration: 0.5 }}
                            >

                                <div className="w-full md:w-3/5 h-[60px] bg-primary relative md:absolute bottom-8 md:bottom-2 -left-20 md:-left-12 rounded-tl-[4rem] rounded-br-[4rem] flex justify-center md:justify-start items-center px-10 md:px-16 pt-0 md:pt-4 rounded-bl-2xl z-40 md:z-10">
                                    <p className="text-base font-semibold capitalize text-white hidden md:block">follow us:</p>
                                    {
                                        data.redesSociales.map((red, index) => (
                                            <a href={red.link} target="_blank" rel="noopener noreferrer" key={index} className="text-white mt-0 ml-2 hover:scale-105 transition-all duration-300 hover:text-white">
                                                <i className={`fa-brands fa-${red.icon} text-base`}></i>

                                            </a>
                                        ))
                                    }
                                    <a href={data.gmb}>
                                        <i className="fa-brands fa-google text-base ml-2 hover:scale-105 transition-all duration-300 hover:text-white"></i>
                                    </a>
                                </div>
                                <div className="w-full h-[60px] bg-secondary hidden  absolute bottom-5 md:bottom-12 -left-16 md:-left-10 rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-2xl z-20 md:flex justify-start items-center px-16">
                                    <a href="/" className="relative text-base font-semibold text-white flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 hover:text-white">
                                        <i className="fa-regular fa-globe text-base"></i>
                                        {data.domain}
                                    </a>
                                </div>
                                {/* <div className="w-full h-[60px] bg-primary absolute top-12 -left-56 rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-2xl -rotate-45 opacity-45"></div> */}

                                <div className="w-[280px] md:w-[400px] h-[280px] md:h-[400px] absolute -right-0 md:-right-40 rounded-[5rem] bg-gradient-to-tr from-primary to-secondary rotate-45 z-30 hidden md:block">
                                    <div className=" relative w-full h-full rotate-0 md:-rotate-45">
                                        <div className="hidden md:block w-full h-[60px] bg-gray-500 absolute top-3 md:top-12 -left-0 md:-left-32 rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rotate-0 md:-rotate-45 shadow-lg"></div>
                                        <div className="hidden md:block w-full h-[60px] bg-gray-500 absolute bottom-3 md:bottom-12 -left-0 md:-left-32 rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-2xl rotate-0 md:rotate-45 shadow-lg"></div>

                                    </div>
                                </div>
                                <div className="w-[320px] md:w-[400px] h-[320px] md:h-[400px] absolute -left-44 -top-10 border-[1.8rem] border-gray-500 rounded-[5rem] bg-gradient-to-tr from-primary to-secondary rotate-45 z-30 md:hidden block"></div>
                                <div className="w-full h-full flex flex-col-reverse md:flex-row justify-center items-center ">
                                    <div className="w-full md:w-3/5 h-full ">
                                        <h1 className="relative z-40 text-2xl md:text-3xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent capitalize mb-3">{data.name}</h1>
                                        <div className="w-full h-1/2 gap-2 flex flex-col justify-end items-start">

                                            {
                                                data.dataGeneral.phones.slice(0, 2).map((phone, index) => (
                                                    <a href={`tel:+1${phone.number}`} className=" flex justify-center items-center gap-1 text-primary hover:scale-105 transition-all duration-300 hover:text-secondary" key={index}>
                                                        <i className={`fa-solid fa-phone text-base w-8 h-8 rounded-full border border-primary flex justify-center items-center `}></i>
                                                        <p key={index} className="text-base font-semibold text-end px-2 py-1 text-wrap">
                                                            {phone.number}
                                                        </p>
                                                    </a>
                                                ))
                                            }
                                            {
                                                data.dataGeneral.emails.map((email, index) => (
                                                    <a href={`mailto:${email.email}`} className=" flex justify-center items-center gap-1 text-primary hover:scale-105 transition-all duration-300 hover:text-secondary" key={index}>
                                                        <i className={`fa-solid fa-envelope text-base w-8 h-8 rounded-full border border-primary flex justify-center items-center `}></i>
                                                        <p key={index} className="text-base font-semibold text-end px-2 py-1">
                                                            {email.email}
                                                        </p>
                                                    </a>
                                                ))
                                            }

                                            <div className=" flex justify-center items-center gap-1 text-primary hover:scale-105 transition-all duration-300 hover:text-secondary" >
                                                <i className={`fa-solid fa-map text-base w-8 h-8 rounded-full border border-primary flex justify-center items-center `}></i>
                                                <p className="text-base font-semibold text-end px2 py-1 text-wrap">
                                                    {data.accountAddress}
                                                </p>
                                            </div>

                                            <a href="/" className="md:hidden flex justify-center items-center gap-1 text-primary hover:scale-105 transition-all duration-300 hover:text-secondary">
                                                <i className="fa-solid fa-globe text-base w-8 h-8 rounded-full border border-primary flex justify-center items-center"></i>
                                                {data.domain}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/5 h-full flex flex-col justify-center items-center md:items-start relative z-50 pb-20 md:pb-0">
                                        <img src={data.logos.primary} alt="logo" className="w-[90%] h-auto object-contain ml-0 lg:ml-6" />
                                    </div>

                                </div>

                            </motion.div>
                        )
                }
            </div>
        </section>
    );
}

export default BusinessCard;