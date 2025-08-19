import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Tooltip } from "react-leaflet";

// Questo serve per far volare la mappa e aprire il popup
const FlyToAndOpenPopup = ({ lat, lng, markerRef }) => {
  const map = useMap();




  useEffect(() => {
    if (lat && lng && markerRef?.current) {
      const target = L.latLng(lat, lng);
      const offset = map.getSize().y * 0.25;
      const targetPoint = map.latLngToContainerPoint(target).sbustract([0, offset]);
      const finalLatLng = map.containerPointToLatLng(targetPoint);


      map.flyTo(finalLatLng, 16, { duration: 1.2 });

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
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
        className="rounded-3xl shadow-xl border border-gray-300 dark:border-gray-600 overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800"
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
            iconUrl: `/images/marker${reperto.numero_marker || i + 1}.png`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          });

          return (
            <Marker
              key={reperto.slug}
              position={[reperto.lat, reperto.lng]}
              icon={customIcon}
              ref={(ref) => {
                if (ref) markerRefs.current[reperto.slug] = ref;
              }}
            >
              <Tooltip direction="top" offset={[0, -15]} opacity={1} permanent={false}>
                {reperto.nome}
              </Tooltip>
              <Popup>
                <div className="rounded-2xl bg-white dark:bg-blue-900 p-4 shadow-xl max-w-[240px] text-center">
                  <h3 className="text-base font-semi-bold text-gray-800 dark:text-white">{reperto.nome}</h3>
                  <img
                    src={reperto.immagine}
                    alt={reperto.nome}
                    className="mt-2 rounded-md object-contain h-24 w-full mx-auto"
                  />
                  <a
                    href={`/reperto/${reperto.slug}`}
                    className="inline-block mt-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:text-white px-3 py1 rounded-lg shadow transition-colors"
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
