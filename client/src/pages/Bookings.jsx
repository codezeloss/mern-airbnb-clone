import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../Components/AccountNavigation";
import BookingDates from "../Components/BookingDates";
import PlaceImg from "../Components/PlaceImg";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getAllUserBookings() {
      const { data } = await axios.get("/bookings/user-bookings");
      setBookings(data);
    }

    getAllUserBookings();
  }, []);

  return (
    <div>
      <AccountNavigation />

      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`account/bookings/${booking._id}`}
              key={booking._id}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>

              <div className="py-3 grow pr-3">
                <h2 className="text-xl">{booking.place.title}</h2>

                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="">Total price: ${booking.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Bookings;
