import React from "react";

const LandingFooter = () => {
  return (
    <>
      <div className="footer-container ">
        <div className="flex  justify-content-between align-items-center  p-6">
          <div className="">
            <p>+123 456 789</p>
            <p>9g2Z8@example.com</p>
          </div>
          <div>
            <h1 className="">Logo</h1>
          </div>
          <div className="flex  gap-2 pt-1">
            <i className="text-2xl fa-brands fa-facebook"></i>
            <i className="text-2xl fa-brands fa-twitter"></i>
            <i className="text-2xl fa-brands fa-instagram"></i>
            <i className="text-2xl fa-brands fa-linkedin"></i>
            <i className="text-2xl fa-brands fa-github"></i>
          </div>
        </div>
        <hr className="landingpage-divider w-full" />
        <div className="flex justify-content-between items-center px-6">
          <p className=" pb-3">
            1234 Street Name, City Name, AA 99999 <br />
          </p>
          <p className=" pb-3">Copyright © 2024. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default LandingFooter;
