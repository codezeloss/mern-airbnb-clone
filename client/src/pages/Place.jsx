import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../Components/BookingWidget";
import PlaceAddressLink from "../Components/PlaceAddressLink";
import PlaceGallery from "../Components/PlaceGallery";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function getPlaceInfos() {
      const response = await axios.get(`/places/place/${id}`);
      setPlace(response.data);
    }
    getPlaceInfos();
  }, [id]);

  if (!place) {
    return "Loading the place...";
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      
      <PlaceAddressLink place={place} />

      <PlaceGallery place={place} />

      <div className="grid my-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{place.description}</p>
          </div>
          <div>
            <p>
              <span className="font-medium">Check-in:</span> {place.checkIn}
            </p>
            <p>
              <span className="font-medium">Check-out:</span> {place.checkOut}
            </p>
            <p>
              <span className="font-medium">Max number of guests:</span>{" "}
              {place.maxGuests}
            </p>
          </div>
        </div>
        <BookingWidget place={place} />
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <p className="text-sm text-gray-500 leading-5 mb-4 mt-2">
          {place.extraInfos}
        </p>
      </div>
    </div>
  );
};

export default Place;
