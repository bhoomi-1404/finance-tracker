import React from "react";
import LandingPageNavbar from "../Components/LandingPageNavbar";
import ProjectFeatures from "../Components/ProjectFeatures";
import LandingPageCarousel from "../Components/LandingPageCarousel";
const LandingPage = () => {
  return (
    <div>
      <section>
        {" "}
        <LandingPageNavbar />
      </section>
      <section className="manage" id="manage">
        {" "}
        <ProjectFeatures />
      </section>
      <section className="features" id="features">
        <LandingPageCarousel />
      </section>
    </div>
  );
};
export default LandingPage;
