import React, { useRef } from "react";
import analyticsImg from "../assets/analytics.png";
import budgetImg from "../assets/dashboard.png";
import transactionsImg from "../assets/transactions.png";
import goalsImg from "../assets/goals.png";
import "../assets/carousel.css";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import { TbTransactionRupee } from "react-icons/tb";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import "../assets/carousel.css";
const carouselItems = [
  {
    title: "Expense Analytics",
    description: "Visualize your spending with beautiful charts.",
    image: analyticsImg,
    icon: <IoAnalyticsOutline />,
  },
  {
    title: "Budget Planning",
    description: "Set monthly budgets and track progress.",
    image: budgetImg,
    icon: <LuWallet />,
  },
  {
    title: "Transaction History",
    description: "Keep transactions organized.",
    image: transactionsImg,
    icon: <TbTransactionRupee />,
  },
  {
    title: "Financial Goals",
    description: "Track your saving goals with ease.",
    image: goalsImg,
    icon: <RiMoneyRupeeCircleLine />,
  },
];

export default function LandingPageCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Adjust based on card width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container" ref={scrollRef}>
        {carouselItems.map((item, index) => (
          <div>
            <div className="carousel-card" key={index}>
              <div className="upper-part">
                <div className="carousel-icon ">{item?.icon}</div>
                <div className="carousel-header">{item?.title}</div>
                <div className="carousel-description">{item.description}</div>
              </div>
              <img src={item.image} alt={item.title} className="carousel-img" />
            </div>
          </div>
        ))}
      </div>
      <div className="btn-wrapper">
        {" "}
        <button className="nav-btn left" onClick={() => scroll("left")}>
          <FaArrowLeft />
        </button>
        <button className="nav-btn right" onClick={() => scroll("right")}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
