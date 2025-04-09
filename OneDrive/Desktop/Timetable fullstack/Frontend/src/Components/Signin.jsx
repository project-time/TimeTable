import React, { useState } from "react";
import './Signin.css'
import { Link } from "react-router-dom";

const Signin = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can handle the form submission logic, like making an API call
  };

  return (

      <div className="bodysignin">
        <form onSubmit={handleSubmit}>
          <div className="containersignin">
            <div className="input-groupsignin">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Link to="/Profile"><button type="submit">Submit</button></Link>
            </div>
          </div>
        </form>
      </div>
  );
};

export default Signin;
