import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingDates from "../Components/BookingDates";
import PlaceAddressLink from "../Components/PlaceAddressLink";
import PlaceGallery from "../Components/PlaceGallery";

const Booking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function getBookingInfos() {
      if (id) {
        const response = await axios.get("/bookings/user-bookings");
        const foundBooking = response.data.find((_id) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      }
    }

    getBookingInfos();
  }, [id]);

  //
  if (!booking) {
    return "No booking!";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>

      <PlaceAddressLink place={booking.place} className="my-2 block" />

      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <p>Total price </p>
          <p className="text-3xl">${booking.price}</p>
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default Booking;
