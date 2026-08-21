import { useState } from "react";

interface Props {
  data: any;
  selectedUrlCity?: string; // URL de mapa seleccionada inicialmente (opcional)
  showCityList?: boolean; // Mostrar chips de ciudades
  singleCityName?: string; // Mostrar esta ciudad en el heading
}

const Map = ({ data, selectedUrlCity, showCityList = true, singleCityName }: Props) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(
    selectedUrlCity || data.dataGeneral.location[0]?.urlCity || null
  );

  const handleCityClick = (urlCity: string) => {
    setSelectedCity(urlCity);
  };

  const currentCityName =
    singleCityName ||
    data.dataGeneral.location.find((l: any) => l.urlCity === selectedCity)?.city ||
    data.dataGeneral.location[0]?.city;

  return (
    <section className="w-[92%] md:w-[88%] max-w-7xl mx-auto py-16 sm:py-24">
      {/* Contenedor Asimétrico de Dos Columnas estilo Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* ================= COLUMNA IZQUIERDA: CONTROL DE COBERTURA ================= */}
        <div className={`flex flex-col justify-center space-y-6 ${showCityList ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-satellite-dish animate-pulse"></i> Service Radius
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              We Cover <span className="text-primary">{data?.milesCover} Miles</span> Around <span className="block text-slate-700 font-light">{currentCityName}</span>
            </h2>
            <p className="text-slate-500 text-sm font-normal">
              Select a city from our official coverage zone to instantly preview our local operating perimeter.
            </p>
          </div>

          {/* Separador sutil decorativo */}
          {showCityList && <hr className="border-slate-200/80 my-2" />}

          {/* Listado de Chips de Ciudades Estilizado */}
          {showCityList && (
            <div className="flex flex-wrap lg:flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {data.dataGeneral.location.map((item: any, index: number) => {
                const isActive = selectedCity === item.urlCity;
                return (
                  <button
                    key={index}
                    onClick={() => handleCityClick(item.urlCity)}
                    className={`group w-full sm:w-auto lg:w-full flex items-center justify-between text-left p-3.5 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-950/20 translate-x-0.5"
                        : "bg-slate-50 border-slate-200/60 text-slate-700 hover:bg-white hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                        isActive ? "bg-white/10 text-primary" : "bg-white text-slate-400 border border-slate-200 group-hover:text-primary"
                      }`}>
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <span className="text-sm font-bold tracking-tight truncate">{item.city}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                      isActive ? "bg-primary text-white scale-100" : "bg-slate-200/50 text-slate-400 opacity-0 group-hover:opacity-100 scale-90"
                    }`}>
                      <i className="fa-solid fa-chevron-right text-[9px]"></i>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= COLUMNA DERECHA: FRAME DEL MAPA INTERACTIVO ================= */}
        <div className={`w-full relative ${showCityList ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {selectedCity ? (
            <div className="w-full h-[350px] sm:h-[450px] lg:h-full min-h-[540px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl relative group bg-slate-100">
              
              {/* Efecto Glass flotante indicador de carga/mapa activo */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-800">
                <i className="fa-solid fa-map text-primary"></i>
                <span className="uppercase tracking-wide text-[10px]">Live Map View</span>
              </div>

              <iframe
                src={selectedCity}
                width="100%"
                height="100%"
                title="Geo Location"
                className="w-full h-full border-0 filter grayscale-[15%] contrast-[105%] transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <div className="w-full h-full min-h-[400px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 text-lg">
                <i className="fa-solid fa-map-marked-alt"></i>
              </div>
              <p className="text-sm font-semibold text-slate-500">No area selected to display</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Map;