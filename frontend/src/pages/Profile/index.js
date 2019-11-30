import React, { Component } from 'react';
import back from '../../assets/Back.svg';
import estudae from '../../assets/estudae.svg';
import './style.css';
import profile_pic from '../../assets/profile_pic.svg';
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import api from '../../services/api';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

class Profile extends Component {
    constructor(props){
      super(props);
      this.state = { 
          name:'', 
          password:'', 
          email:''
      }
  }
  handleInputChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    await this.setState({
      [name]: value
    });
  }
  componentDidMount = async () => {
    try{
      const { data } = await api.get('/user/profile');
      await this.setState({
        name: data.name, 
        password: data.password, 
        email: data.email
      });
    }catch(e){
      console.log(e);
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const { name, password, email } = this.state;
      await api.post('/user/profile', {
        name,
        password,
        email
      })
      this.props.history.push("/");

    }catch(error){
      error.response.data.forEach(async (error) =>{
        await toast.error(error, {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          className:"toastifyStyle"
        });    
      })
    }
  }

  render() {
    return (
      <>
        <div className="profile__topBar__container">
        <ToastContainer 
                        rtl={false}
                        pauseOnVisibilityChange
                    />
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
          <form onSubmit={this.handleSubmit} className="profile__form">
            <label className="profile__label">
              Name:
              <input name="name" className="profile__input" type="text" onChange={this.handleInputChange} value={this.state.name} />
            </label>
            <label className="profile__label">
              Email:
              <input name="email" className="profile__input" type="text" onChange={this.handleInputChange} value={this.state.email} />
            </label>
            <label className="profile__label">
              Password:
              <input name="password" className="profile__input" type="password" onChange={this.handleInputChange} />
            </label>
            <button>
              <span>Save</span>
            </button>
          </form>
          <a href="#" 
            className = "form__signout" 
            onClick={() => {logout(); this.props.history.push("/")}}> Signout</a>
        </div>
      </>
    );
  }
}
export default withRouter(Profile);