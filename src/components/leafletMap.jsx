import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HospitalList from "./hospitalList";

export default function LeafletMap({ user, hospitals }) {

  const userIcon = new L.Icon({
    iconUrl: "https://www.svgrepo.com/show/513552/location-pin.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error fetching location:", error)
      );
    }
  }, []);

  return (
    <div className="h-screen">
      {location ? (
        <MapContainer center={[location.lat, location.lng]} zoom={13} className="h-[80vh] w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Location Marker */}
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>{user ? `You are here, ${user.displayName}` : "Your Location"}</Popup>
          </Marker>

          {/* Display Nearby Hospitals */}
          {hospitals.map((hospital) => (
            <Marker key={hospital.id} position={[hospital.location.lat, hospital.location.lng]}>
              <Popup>
                <strong>{hospital.name}</strong>
                <br />
                {hospital.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}

      <HospitalList hospitals={hospitals}/>
    </div>
  );
}
