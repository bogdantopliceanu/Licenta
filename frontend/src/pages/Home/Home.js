import React from "react";
import {Link} from "react-router-dom";
import "./Home.scss";
import { RiCopyrightLine } from "react-icons/ri";
import heroImg from "../../assets/home1.jpg"
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLiks";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
      <div className="logo">
         <RiCopyrightLine size={35} />
       </div>

        <ul className="home-links">
          <ShowOnLogout>
          <li>
            <Link to="/register">Register</Link>
          </li>
          </ShowOnLogout>
          <ShowOnLogout>
          <li>
            <button className="--btn --btn-primary">
            <Link to="/login">Login</Link>
            </button>
          </li>
          </ShowOnLogout>
          <ShowOnLogin>
          <li>
            <button className="--btn --btn-primary">
            <Link to="/dashboard">Dashboard </Link>
            </button>
          </li>
          </ShowOnLogin>
        </ul>
      </nav>

     

      <section className="container hero">
        <div className="hero-text">
          <h2>Recommendation system for tourist destinations</h2>
          <p>Embark on a personalized adventure and discover the world through our travel recommendation system. From exotic getaways to authentic cultural experiences, we'll help you find the perfect destination for your journey. Let us guide you to the beauty of the world!</p>
          <div className="hero-buttons">
          <button className="--btn --btn-secondary">
            <Link to="/dashboard">Dashboard </Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="200+" text="Destinations" />
            <NumberText num="30+" text="Countries" />
            <NumberText num="500+" text="Users" />
          </div>
        </div>

        <div className="hero-image">
        <img src={heroImg} alt="imagine" width="100%" height="100%"></img>
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;

