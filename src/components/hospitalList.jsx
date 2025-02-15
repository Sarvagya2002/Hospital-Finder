const HospitalList = ({ hospitals }) => {
  if (!hospitals || hospitals.length === 0) {
    return <p className="text-center text-gray-500">No hospitals found nearby.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Nearby Hospitals</h2>
      <ul className="divide-y divide-gray-300">
        {hospitals.map((hospital, index) => (
          <li key={hospital.id || index} className="py-2">
            <strong className="text-blue-700">{hospital.name}</strong>
            <p className="text-gray-600 text-sm">{hospital.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
