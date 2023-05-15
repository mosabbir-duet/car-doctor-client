import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, img, title, price } = service;
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10 ">
          <img src={img} alt="Shoes" className="rounded-xl h-52" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>

          <div className="card-actions flex  items-center justify-between text-orange-600">
            <h2 className="card-title">Price: $ {price}</h2>
            {/* <button className="btn btn-primary">Buy Now</button> */}
            <Link
              to={`/checkout/${_id}`}
              className="p-2 bg-indigo-50 rounded-full"
            >
              <HiArrowNarrowRight className="text-2xl cursor-pointer "></HiArrowNarrowRight>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
