import React, { useState, useEffect } from "react";
import "../assets/signUpForm.css";
import { LuWallet } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import { TbTransactionRupee } from "react-icons/tb";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    const loginData = localStorage.getItem("financeTrackerUser");
    if (loginData) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First name must contain only letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name must contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else if (name === "firstName" || name === "lastName") {
      const alphaValue = value.replace(/[^A-Za-z]/g, "");
      setFormData({ ...formData, [name]: alphaValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("financeTrackerUser", JSON.stringify(formData));
      alert("Form submitted successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="sign-up-header">
          <LuWallet />
          <div>ExpenseTracker</div>
        </div>
        <div className="big-heading">One click to go all digital.</div>
        <p>
          Track your expenses, manage your budget, and achieve your financial
          goals with our powerful finance tracker.
        </p>

        <div className="wrapper">
          <div className="wrapper-item">
            <IoAnalyticsOutline />
            <div>Budget Planning</div>
          </div>
          <div className="wrapper-item">
            {" "}
            <LuWallet />
            <div>Expense Analytics</div>
          </div>
        </div>
        <div className="wrapper">
          <div className="wrapper-item">
            <TbTransactionRupee />
            <div>Transaction History</div>
          </div>
          <div className="wrapper-item">
            <RiMoneyRupeeCircleLine />
            <div>Financial Goals</div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80"
          alt="Finance Dashboard"
        />
      </div>
      <div className="signup-right">
        <h3>Sign up</h3>
        <p>Create your account to start tracking your finances</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </div>
          <button type="submit" className="primary-btn">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
