import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Checkout = () => {
  const service = useLoaderData();
  const { _id, title, price, img } = service;

  const { user } = useContext(AuthContext);
  const handleToOrderInfo = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const message = form.message.value;
    const orderBookingInfo = {
      customerName: name,
      date,
      service_id: _id,
      img,
      price,
      email,
      message,
    };
    console.log(orderBookingInfo);

    // data insert into database using post method
    fetch("http://localhost:3000/orderBookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderBookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Wow",
            text: "Your order placed successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  return (
    <div className="bg-base-200 p-16 rounded-xl">
      <h2 className="text-3xl text-orange-500 pb-8 text-center">
        Service Name: {title}
      </h2>
      <form onSubmit={handleToOrderInfo} className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl ">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              defaultValue={user?.displayName}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl ">Date</span>
            </label>
            <input type="date" name="date" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl ">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              defaultValue={user?.email}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl ">Due Amount</span>
            </label>
            <input
              type="text"
              placeholder="Due amount"
              defaultValue={`$ ${price}`}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            placeholder="Your message"
            className="rounded-xl p-4"
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <input
            type="submit"
            value="Order Confirm"
            className="btn bg-orange-500 border-none btn-block hover:bg-orange-600"
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
