import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Questo serve per far volare la mappa e aprire il popup
const FlyToAndOpenPopup = ({ lat, lng, markerRef }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng && markerRef?.current) {
      map.flyTo([lat, lng], 16, { duration: 1.2 });
      setTimeout(() => {
        markerRef.current.openPopup();
      }, 700);
    }
  }, [lat, lng, markerRef]);

  return null;
};

const ItinerarioMap = ({ reperti, selectedReperto }) => {
  const markerRefs = useRef({});
  const mapSectionRef = useRef(null);

  // Scrolla alla mappa quando cambia il reperto selezionato
  useEffect(() => {
    if (selectedReperto && mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedReperto]);

  if (typeof window === "undefined") return null;

  return (
    <div ref={mapSectionRef}>
      <MapContainer
        center={[45.4064, 11.8768]} // Padova centro
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        className="rounded-2xl shadow-lg border border-gray-300 overflow-hidden"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {selectedReperto && (
          <FlyToAndOpenPopup
            lat={selectedReperto.lat}
            lng={selectedReperto.lng}
            markerRef={markerRefs.current[selectedReperto.id]}
          />
        )}

        {reperti.map((reperto, i) => {
          const customIcon = new L.Icon({
            iconUrl: `/images/marker${i + 1}.png`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          });

          return (
            <Marker
              key={reperto.id}
              position={[reperto.lat, reperto.lng]}
              icon={customIcon}
              ref={(ref) => {
                if (ref) markerRefs.current[reperto.id] = ref;
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="text-lg font-bold">{reperto.nome}</h3>
                  <img src={reperto.immagine} alt={reperto.nome} className="mt-2 rounded-lg" />
                  <a
                    href={`/reperto/${reperto.id}`}
                    className="mt-3 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  >
                    Scopri di più!
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ItinerarioMap;
