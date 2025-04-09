import React from "react";
import "./Signup.css"; // Assuming the CSS file is in the same folder
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bodysignup">
      <form action="/Signup" method="post">
        <div className="containersignup">
          <div className="input-groupsignup">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter your name"
              required
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter your name"
              required
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            <button type="submit" className="buttonsignup"><Link to='/Profile'>Submit</Link></button>
            <div className="s1signup">
              <label>
                Already have an account?&nbsp;
                <FontAwesomeIcon icon={faArrowRight} />
              </label>
              <label>
                <Link to="/Profile"><a href="#">Signin</a></Link>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
