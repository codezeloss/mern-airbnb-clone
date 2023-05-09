/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../Components/AccountNavigation";

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getAllPlaces() {
      try {
        const response = await axios.get("/places/all-places");
        const { data } = response;
        setPlaces(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllPlaces();
  }, []);

  // **
  return (
    <div>
      <AccountNavigation />

      <div className="text-center">
        <Link
          className="inline-flex items-center gap-1 bg-primary text-white py-2 px-4 rounded-full text-sm"
          to="/account/places/new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>

          <p>Add new place</p>
        </Link>
      </div>

      <div>
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl"
            >
              <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                {places.photos.length > 0 && (
                  <img src={place.photos[0]} alt="Photo" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Places;
