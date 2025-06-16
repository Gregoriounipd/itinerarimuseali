import { useState, useRef } from "react";
import Map from "@/components/Map";

const ItinerarioPage = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const mapRef = useRef(null);

  const handleCardClick = (lat, lng) => {
    setSelectedPosition([lat, lng]);

    // Scrolla fino alla mappa
    if (mapRef.current) {
      window.scrollTo({
        top: mapRef.current.offsetTop - 80, // -80 se hai header sticky
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Map selectedPosition={selectedPosition} mapRef={mapRef} />

      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Esempio finto con due reperti */}
        <div onClick={() => handleCardClick(45.4068, 11.8772)} className="card">Reperto A</div>
        <div onClick={() => handleCardClick(45.4080, 11.8755)} className="card">Reperto B</div>
      </div>
    </div>
  );
};

export default ItinerarioPage;
