import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../Components/BookingWidget";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
    return "loading";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              className="fixed right-8 flex items-center gap-1 py-1 px-2 rounded-xl bg-white text-black shadow shadow-gray-500"
              onClick={() => setShowAllPhotos(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="text-base">Close photos</p>
            </button>
          </div>

          <div className="space-y-4">
            {place?.photos.length > 0 &&
              place.photos.map((photo) => (
                <div key={photo}>
                  <img
                    src={`http://localhost:4000/api/v1/uploads/${photo}`}
                    alt="Photo"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        href={`https://maps.google.com/?q=${place.address}`}
        target="_blank"
        className="flex items-center gap-1 font-semibold underline my-2"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>

        <p>{place.address}</p>
      </a>

      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square cursor-pointer object-cover"
                  src={`http://localhost:4000/api/v1/uploads/${place.photos?.[0]}`}
                  alt="Photo"
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square cursor-pointer object-cover"
                src={`http://localhost:4000/api/v1/uploads/${place.photos?.[0]}`}
                alt="Photo"
                onClick={() => setShowAllPhotos(true)}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={`http://localhost:4000/api/v1/uploads/${place.photos?.[0]}`}
                  alt="Photo"
                  onClick={() => setShowAllPhotos(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute flex items-center gap-2 text-sm bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          onClick={() => setShowAllPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>

          <p>Show more photos</p>
        </button>
      </div>

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

        <div>
          <BookingWidget place={place} />
        </div>
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
