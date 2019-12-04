import React, { Component } from 'react';
import back from '../../assets/Back.svg';
import estudae from '../../assets/estudae.svg';
import './style.css';
import profile_pic from '../../assets/profile_pic.svg';
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = { 
      name:'', 
      password:'', 
      email:'',
      nameError:'',
      passwordError:'',
      emailError:'',
      edited: false,
      formIsValid: false,
      file:null
    }
  }
  componentDidMount = async () => {
    try{
      const { data } = await api.get('/user/profile');
      this.setState({
        name: data.name, 
        password: data.password, 
        email: data.email
      });
    }catch(e){
      console.log(e);
    }
  }
  formValidate = () => {
    if(this.state.nameError === '' && this.state.passwordError === '' && this.state.emailError === '' && this.state.name !== '' && this.state.password !== '' && this.state.email !== '' ){
      this.setState({formIsValid: true})
    }else{
      this.setState({formIsValid: false})
    }
  }
  validateName = () => {
      const {name} = this.state; 
      if(!name || name.trim() === ''){
          this.setState({nameError : "Please type your name"});
          this.formValidate();
          return false;
      }
      this.formValidate();
      return true;
  }
  validatePassword = () => {
      const {password} = this.state; 
      if(!password || password.trim() === ''){
          this.setState({passwordError : "Please type your password"});
          this.formValidate();
          return false;
      }
      else if(password.length < 6){
          this.setState({passwordError : "Your password must be longer than 6 characters"});
          this.formValidate();
          return false;
      }
      this.formValidate();
      return true;
  }    
  validateEmail = () => {
      const {email} = this.state; 
      if(!email || email.trim() === ''){
          this.setState({emailError : "Please type your email"});
          this.formValidate();
          return false;
      }else if (email.indexOf(['@ifms.edu.br']) === -1){
          this.setState({emailError : 'Please enter an email with the termination "@ifms.edu.br"'});
          this.formValidate();
          return false;
      }
      this.formValidate();
      return true;
  }
  handleImageInputChange = (event) => {
    this.setState({
      file: event.target.files[0],
      edited:true
    });
  }
  handleInputChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
      edited:true
    });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    if(this.validateName() === true && this.validateEmail() === true && this.validatePassword() === true){
      var form = new FormData();
      const { name, password, email, file } = this.state;
      form.append("file", file);
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);
      try{
        const response = await api.post('/user/profile', form,{
          headers: {
            'accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
          }
        })

        await toast.success(response.data, {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          className:"toastifyStyle"
        });    
      }catch(error){
        await toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          className:"toastifyStyle"
        });    
      }
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
            <label className="labelFileInput"> 
              Change image 
              <input name="file" id="upload" type="file" onChange={this.handleImageInputChange}  className="fileInput"/>
            </label>
            <h3> {this.state.name} </h3>
          </div>
          <form encType="multipart/form-data" onSubmit={this.handleSubmit} className="profile__form">
            <label className="profile__label">
              Name:
              <input 
                value = {this.state.name} 
                name="name" 
                className="profile__input" 
                type="text" 
                onBlur={this.validateName} 
                onFocus={() => this.setState({nameError: ""})} 
                onChange = {this.handleInputChange} 
              />
              <span className={this.state.nameError !== '' ? "negativeFeedback" : "positiveFeedback"}>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {this.state.nameError}
              </span>
            </label>
            <label className="profile__label">
              Email:
              <input 
                name="email" 
                className="profile__input" 
                type="text" 
                value={this.state.email} 
                onBlur={this.validateEmail} 
                onFocus={() => this.setState({emailError: ""})} 
                onChange={this.handleInputChange}
              />
              <span className={this.state.emailError !== '' ? "negativeFeedback" : "positiveFeedback"}>
                  <FontAwesomeIcon icon={faExclamationCircle} color="red" /> 
                  {this.state.emailError}
              </span>
            </label>
            <label className="profile__label">
              Password:
              <input 
                name="password" 
                className="profile__input" 
                type="password" 
                onBlur={this.validatePassword} 
                onFocus={() => this.setState({passwordlError: ""})} 
                onChange={this.handleInputChange}
              />
              <span className={this.state.passwordError !== '' ? "negativeFeedback" : "positiveFeedback"}>
                <FontAwesomeIcon icon={faExclamationCircle} color="red" /> 
                {this.state.passwordError}
              </span>  
            </label>
            <button disabled = {!this.state.edited || !this.state.formIsValid}>
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