import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getAllPlaces() {
      const { data } = await axios.get("/places/all-places");
      setPlaces(data);
    }
    getAllPlaces();
  }, []);

  return (
    <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <div className="flex bg-gray-500 mb-2 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={`http://localhost:4000/api/v1/uploads/${place.photos?.[0]}`}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm text-gray-500">{place.title}</h2>
            <p className="mt-1">
              <span className="font-bold">${place.price}</span>/night
            </p>
          </Link>
        ))}
    </div>
  );
};

export default Home;
