// import React from "react";

import Header from "../Header/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="p-4 bg-white ">
        <h1 className="text-2xl font-bold mb-4 mt-20">
          Welcome to this highly Optimized and Fast Loading online shopping App
        </h1>
        <p className="font-semibold font-serif">
          A large-scale and highly performant App, Technology Used - React,
          Javascript, Tailwind, Redux.
        </p>
        <ul className="font-serif">
          <li> 1) Created / should load the Home component.</li>
          <li> 2) Powered up the data layer using JSON product API data.</li>
          <li>
            3) Implemented /product/:id which will load the ProductPage
            component, where :id is the dynamic parameter representing the
            product ID.
          </li>
          <li>4) Created /cart which will load the Cart component.</li>
          <li>
            5) Used React-Redux for efficient state management and fast updates.
          </li>
        </ul>
      </div>
    </>
  );
};

export default About;
