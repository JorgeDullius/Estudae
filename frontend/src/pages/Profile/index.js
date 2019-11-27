import React, { Component } from 'react';
import back from '../../assets/Back.svg';
import estudae from '../../assets/estudae.svg';
import './style.css';
import profile_pic from '../../assets/profile_pic.svg';
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

class Profile extends Component {
  render() {
    return (
      <>
        <div className="profile__topBar__container">
          <div className="topBar">
            <button className="backButton" onClick={()=>this.props.history.push("/")}>
                <img src={back} alt="" />
                Back
            </button>
            <img className="profile__topBar__logo" src={estudae} alt="" />
          </div>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1> Edit profile </h1>
            <img src={profile_pic}></img>
            <a href="#"> Change image </a>
            <h3> Jorge Dullius </h3>
          </div>
          <form className="profile__form">
            <label className="profile__label">
              Name:
              <input className="profile__input" type="text" placeholder="Your name here" />
            </label>
            <label className="profile__label">
              Email:
              <input className="profile__input" type="text" placeholder="Your name here" />
            </label>
            <label className="profile__label">
              Password:
              <input className="profile__input" type="password" placeholder="Your name here" />
            </label>
            <button>
              <span>Save</span>
            </button>
          </form>
          <a href="#" className = "form__signout" 
            onClick={() => {logout(); this.props.history.push("/")}}> Signout</a>
        </div>
      </>
    );
  }
}
export default withRouter(Profile);