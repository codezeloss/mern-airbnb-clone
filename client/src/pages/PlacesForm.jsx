import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import PhotosUploader from "../Components/PhotosUploader";

const PlacesForm = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfos, setExtraInfos] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState(false);

  // **
  useEffect(() => {
    if (!id) {
      return;
    }

    async function getPlace() {
      try {
        const { data } = await axios.get(`/places/place/${id}`);

        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfos(data.extraInfos);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      } catch (error) {
        console.log("Failed to get a place with the given ID");
      }
    }
    getPlace();
  }, [id]);

  // ** Optimize repeated code
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 font-semibold">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  // ** Add New Place
  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfos,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update
      await axios.put("/places/place", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places/place", {
        ...placeData,
      });
      setRedirect(true);
    }
  }

  // ** Redirect the user
  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <form className="accommodations-form" onSubmit={savePlace}>
        {/* TITLE */}
        {preInput("Title", "title for your place. should be short and catchy!")}
        <input
          type="text"
          placeholder="title, for example: My best apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ADDRESS */}
        {preInput("Address", "address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* PHOTOS */}
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {/* DESCRIPTION */}
        {preInput("Description", "description of the place")}
        <textarea
          className="w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* PERKS */}
        {preInput("Perks", "select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra infos", "house rules, etc")}
        <textarea
          value={extraInfos}
          onChange={(e) => setExtraInfos(e.target.value)}
        />

        {/* CHECK IN & OUT - GUESTS */}
        {preInput(
          "Check in&out time, max guests",
          "add check in and out time, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-2 mb-8 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1 font-medium">Check in time</h3>
            <input
              type="number"
              placeholder="14"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 font-medium">Check out time</h3>
            <input
              type="number"
              placeholder="11"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 font-medium">Max number of guest</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 font-medium">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesForm;
