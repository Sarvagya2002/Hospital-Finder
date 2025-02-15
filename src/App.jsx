import { useState, useEffect } from "react";
import GoogleLogin from "./components/googleLogin";
import MapComponent from "./components/map";
import HospitalList from "./components/hospitalList";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import LeafletMap from "./components/leafletMap";

const App = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Geolocation is available.");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location fetched successfully:", { latitude, longitude });
          
          setLocation({ lat: latitude, lng: longitude });
          
          try {
            fetchNearbyHospitals(latitude, longitude);
          } catch (error) {
            console.error("Error calling fetchNearbyHospitals:", error);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);
  

  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      console.log("Fetching hospitals for:", lat, lng);
      const query = `[out:json];node[amenity=hospital](around:5000,${lat},${lng});out;`;
      const encodedQuery = encodeURIComponent(query);
      const url = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Hospital data:", data);

      setHospitals(
        data.elements.map((hospital) => ({
          id: hospital.id,
          name: hospital.tags?.name || "Unnamed Hospital",
          address: hospital.tags?.["addr:full"] || "No address available",
          location: { lat: hospital.lat, lng: hospital.lon },
        }))
      );
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
  

  return (
    <div className="App">
      <Router>
        <nav className="px-10 flex justify-between  py-4 bg-blue-200">
        <Link to={"/"}>Hospital Finder</Link>
        <span>{user? user.displayName: ""}</span>
        </nav>
        <Routes>
          <Route path="/" element={<GoogleLogin setUser={setUser}/>}></Route>
          <Route path="/leaflet-map" element={<LeafletMap user={user} hospitals={hospitals}/>}></Route>
        </Routes>
      </Router>
      {/* {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="container">
          <h1>Welcome, {user.name}</h1>
          {location && <MapComponent location={location} hospitals={hospitals} />}
          <HospitalList hospitals={hospitals} />
        </div>
      )} */}

      
    </div>
  );
};

export default App;