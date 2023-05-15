import React, { useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  fetch("http://localhost:3000/services")
    .then((res) => res.json())
    .then((data) => setServices(data));

  return (
    <div className="mb-16">
      <div className="text-center space-y-2">
        <h3 className="text-xl text-orange-600 font-semibold">Service</h3>
        <h4 className="text-3xl font-semibold">Our Service Area</h4>
        <p>
          The majority have suffered alteration in some form, by injected
          humour, or randomised <br /> words which don't look even slightly
          believable.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
