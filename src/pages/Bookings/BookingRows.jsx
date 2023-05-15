import React from "react";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const BookingRows = ({ booking, setBookings, bookings }) => {
  const { _id, img, customerName, price, date } = booking;
  const handleToDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/orderBookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remaining = bookings.filter((booking) => booking._id != id);
              setBookings(remaining);
            }
          });
      }
    });
  };
  return (
    <>
      <tr>
        <th className="p-0">
          <span
            onClick={() => {
              handleToDelete(_id);
            }}
            className="bg-black rounded-full  p-1 inline-block mx-auto"
          >
            <FiX className="text-xl text-white"></FiX>
          </span>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="rounded-md w-24 h-24">
                <img src={img} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{customerName}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>$ {price}</td>
        <td>{date}</td>
        <th>
          <button className="btn btn-warning btn-sm">Pending</button>
        </th>
      </tr>
    </>
  );
};

export default BookingRows;
