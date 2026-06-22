import React, { useState } from 'react';
import type { RootObject } from '../../interfaces/dbData';

interface DigitalProps {
    data: RootObject;
}

const Digital: React.FC<DigitalProps> = ({ data }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showQR, setShowQR] = useState(false); // Estado para el Modal
    const [sendInput, setSendInput] = useState("");
    const [active, setActive] = useState(false);
    const handleFlip = () => setIsFlipped(!isFlipped);
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    // Función para abrir el QR sin voltear la tarjeta
    const handleOpenQR = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowQR(true);
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
        <section className="flex flex-col items-center w-full justify-center min-h-screen bg-black overflow-hidden relative">

            {/* MODAL DEL QR */}
            {showQR && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
                    onClick={() => setShowQR(false)}
                >
                    <div
                        className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full animate-in zoom-in duration-300"
                        onClick={stopPropagation}
                    >
                        <div className="flex justify-between w-full items-center mb-2">
                            <h3 className="text-black font-black uppercase text-xl">Scan My QR</h3>
                            <button onClick={() => setShowQR(false)} className="text-gray-400 hover:text-black">
                                <i className="fas fa-times text-2xl"></i>
                            </button>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-2xl border-4 border-sebg-secondary">

                            <img className='h-4/5' src="/assets/img/QR.png" alt="" />
                        </div>

                        <p className="text-gray-500 text-center font-bold text-sm">
                            Scan this code to save my contact information directly to your phone.
                        </p>

                        <button
                            onClick={() => setShowQR(false)}
                            className="w-full bg-secondary text-white py-3 rounded-xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            <div
                className="group perspective w-full max-w-[450px] sm:max-w-[700px] h-[240px] sm:h-[340px] cursor-pointer mt-10"
            >
                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                    {/* LADO FRONTAL */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                        <div className="w-[60%] p-4 sm:p-6 flex flex-col relative">
                            <div className="absolute top-0 left-0 w-6 sm:w-8 h-16 sm:h-20 bg-secondary"></div>
                            <div className="ml-2 sm:ml-4 mt-1 sm:mt-2">
                                <h2 className="text-sm sm:text-xl font-black text-slate-800 uppercase leading-tight">{data.name}</h2>
                                <h2 className="text-sm pl-3 font-black text-slate-800 uppercase leading-tight mt-1">Owner: {data.nameCustomers}</h2>
                                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-4 font-bold text-slate-600 -ml-5">
                                    <div className="flex items-center gap-2 text-base">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full flex items-center justify-center text-white shrink-0"><i className="fas fa-phone text-[7px] sm:text-[8px]"></i></div>
                                        <a href={`tel:1+${data.dataGeneral?.phones[0]?.number}`} onClick={stopPropagation}>1+ {data.dataGeneral?.phones[0]?.number}</a>
                                    </div>

                                    <div className="flex items-center gap-2 text-base">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full flex items-center justify-center text-white shrink-0"><i className="fas fa-envelope text-[7px] sm:text-[8px]"></i></div>
                                        <a href={`mailto:${data.dataGeneral?.emails[0]?.email}`} onClick={stopPropagation} className="truncate">{data.dataGeneral?.emails[0]?.email}</a>
                                    </div>
                                    <div className="flex items-center gap-2 text-base">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full flex items-center justify-center text-white shrink-0"><i className="fas fa-globe text-[7px] sm:text-[8px]"></i></div>
                                        <a href="/" onClick={stopPropagation} className="truncate">{data.domain}</a>
                                    </div>
                                    <div className="flex items-center gap-2 text-base">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full flex items-center justify-center text-white shrink-0"><i className="fa-solid fa-map-pin text-[7px] sm:text-[8px]"></i></div>
                                        <p className="truncate">{data.businessAddress}</p>
                                    </div>

                                    <ul className="flex flex-row gap-4 mt-4 sm:mt-10 text-xl">
                                        {data.redesSociales?.map((item, index) => (
                                            <a key={index} href={item.link} onClick={stopPropagation} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-sebg-secondary transition-colors">
                                                <i className={`text-sm sm:text-lg fa-brands fa-${item.icon}`} />
                                            </a>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Lado Derecho Oscuro con Icono QR Clickeable */}
                        <div className="w-[40%] bg-primary relative flex flex-col items-center justify-center text-white">
                            <div className="absolute inset-0 bg-secondary -left-8 sm:-left-10 rounded-l-[100%] z-0"></div>
                            <div className="absolute inset-0 bg-primary -left-5 sm:-left-6 rounded-l-[100%] z-10"></div>

                            <div className="z-20 flex flex-col items-center gap-2 sm:gap-4 px-2">
                                <img className='w-20 sm:w-72 object-contain max-h-[190px]' src={data.logos?.primary} alt="Logo" />


                                {/* <div 
                                    onClick={handleOpenQR}
                                    className="p-1.5 sm:p-2 bg-white rounded-lg shadow-lg cursor-pointer hover:scale-110 hover:bg-secondary hover:text-white transition-all group"
                                >
                                    <i className="fas fa-qrcode text-black  text-xl sm:text-3xl"></i>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* LADO TRASERO */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-l to-primary from-white rounded-2xl shadow-2xl overflow-hidden flex p-4 sm:p-6 text-white border-2 border-sebg-secondary/30 z-50">
                        <div className="w-[60%] flex flex-col justify-center border-r border-gray-700/50 pr-4 relative">
                            <h4 className="text-[9px] sm:text-[16px] font-black uppercase text-sebg-secondary tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-4 h-[1px] bg-secondary"></span> Services
                            </h4>
                            <ul className="space-y-2 relative z-50">
                                {data.services?.map((service, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-secondary shrink-0"></div>
                                        <a href={`tel:1+${data.dataGeneral?.phones[0]?.number}`} target="_parent" className="relative z-50 pointer-events-auto hover:scale-105 duration-150 transition-all" onClick={stopPropagation}>
                                            <span className="text-[9px] sm:text-[14px] font-bold text-gray-200 uppercase hover:text-sebg-secondary transition-colors">{service.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <div className="w-[40%] flex flex-col items-center justify-center pl-2 sm:pl-4 gap-4 sm:gap-6">
                            <div className="w-20 h-20 sm:w-36 sm:h-36 border border-sebg-secondary/30 bg-white rounded-full p-3 flex items-center justify-center">
                                <img src={data.logos?.primary} alt="Logo" className="w-full object-contain" />
                            </div>
                            <button
                                onClick={sendWhatsapp}
                                rel="noreferrer"
                                className="w-full bg-[#25D366] text-white py-1.5 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                            >
                                <span className="text-[8px] sm:text-[10px] font-black uppercase">WhatsApp</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTÓN VOLTEAR */}
            <button
                onClick={handleFlip}
                className="mt-12 px-10 py-3 bg-secondary text-white font-black text-sm uppercase rounded-full shadow-xl hover:bg-white hover:text-black transition-all active:scale-95 tracking-widest"
            >
                {isFlipped ? 'Show Info' : 'Flip Card'}
            </button>

            <style>{`
                .perspective { perspective: 1500px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </section>
    );
}

export default Digital;


