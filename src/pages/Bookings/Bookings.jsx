import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRows from "./BookingRows";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  //   load data

  useEffect(() => {
    fetch(`http://localhost:3000/orderBookings?email=${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("car-access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBookings(data);
        } else {
          navigate("/");
        }
      });
  }, []);
  return (
    <>
      <h1 className="text-3xl text-center my-8">
        Order Booking Information of {user?.displayName}
      </h1>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <tbody>
            {bookings.map((booking) => (
              <BookingRows
                key={booking._id}
                booking={booking}
                setBookings={setBookings}
                bookings={bookings}
              ></BookingRows>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookings;
