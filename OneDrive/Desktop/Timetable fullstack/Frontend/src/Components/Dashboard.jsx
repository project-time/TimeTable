import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const Dashboard = () => {


    return (
        <div className='bodydashboard'>
            <div className="containerdashboard">
                {/* Bottom Layer */}
                <div className="bottom-layerdashboard"></div>

                {/* Top Curved Layer */}
                <div className="top-curvedashboard"></div>
                    <nav className="navbardashboard">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#help">Help</a></li>
                        </ul>
                        
                        <div className='s1'><Link to='/Signin' style={{textDecoration:'none'}}>Signin&nbsp;
                            <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                        </Link></div>
                        
                    </nav>

                {/* Content */}
                <div className="contentdashboard">
                    <h1>Welcome to Smart Scheduler</h1>
                    <p>Easy to Create | Works in MultiClasses</p>
                </div>

                <div className="maindashboard">
                    <Link to="/Signup">
                        <button className="buttondashboard">
                            Get Started&nbsp;<FontAwesomeIcon icon={faArrowRight} size='lg'  />
                        </button>
                    </Link>
                    <p>Organise Time. Optimise Learning.</p>
                </div>
            </div>
    
        </div>
    );
};

export default Dashboard;
