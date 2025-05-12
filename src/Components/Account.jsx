import React, { useEffect, useState } from "react";
import "../assets/account.css";

const Account = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
  useEffect(() => {
    const savedProfile = localStorage.getItem("financeTrackerUser");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!profile.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!profile.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!profile.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(profile.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Saved data:", profile);
      localStorage.setItem("logindata", JSON.stringify(profile));
      alert("Profile saved successfully.");
    }
  };

  return (
    <div>
      <div className="preferences-container">
        <div className="heading">Profile Information</div>
        <div className="text-sm">
          Update your personal information and how it appears on your account
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="ex: John"
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="ex: Doe"
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label>Email Address</label>
            <div className="email-input-wrapper">
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="ex: abc@gmail.com"
                style={{ width: "100%" }}
              />
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group full-width">
            <label>Phone Number</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="ex: 1234567890"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>

        <div className="button-container">
          <button className="primary-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
