import React, { Component } from 'react';
import './style.css';
import loginImage from '../../assets/Login.svg';
import back from '../../assets/Back.svg';
import estudae from '../../assets/estudae.svg';
import loginMobileImage from '../../assets/undraw_mobile_login.svg'
import api from '../../services/api';
import  { login } from '../../services/auth';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
class Signup extends Component {
    constructor(props){
        super(props);
        this.state = { 
            name:'', 
            password:'', 
            email:'',
            nameError:'',
            passwordError:'',
            emailError:'',
            formIsValid: false
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

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        this.formValidate();
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, password, email} = this.state;

        if(this.validateName() === true && this.validateEmail() === true && this.validatePassword() === true){
            try{
                const response = await api.post('/auth/register', {
                    name,
                    password,
                    email
                });
                login(response.data.token);
                this.props.history.push("/profile");
            }catch(error){
                toast.error(error.response.data.error);
            }
        }
    }
    render() {
        return(     
            <>
                <div className="topBarContainer">
                    <ToastContainer 
                        rtl={false}
                        pauseOnVisibilityChange
                        position = "bottom-right"
                        autoClose = {7000}
                        hideProgressBar = {false}
                        closeOnClick = {false}
                        pauseOnHover = {true}
                        draggable = {true}
                        className = "toastifyStyle"
                    />
                    <div className="topBar">
                        <button className="backButton" onClick={()=>this.props.history.push("/")}>
                            <img src={back} alt="" />
                            Back
                        </button>
                        <img id="logo" src={estudae} alt="" />
                    </div>
                </div>
                <section className="container">
                    <div className='login'>
                        <div>
                            <img id="loginDesktopImage" src={loginImage} alt=""/>
                            <img id="loginMobileImage" src={loginMobileImage} alt=""/>
                        </div>
                        
                        <form onSubmit={this.handleSubmit}>
                            <label id="labelForm">
                                Username:
                                <input 
                                    className = "input__signup"
                                    type="text" 
                                    value = {this.state.name} 
                                    placeholder="Your name here" 
                                    name="name" 
                                    onBlur={this.validateName} 
                                    onFocus={() => this.setState({nameError: ""})} 
                                    onChange = {this.handleInputChange} 
                                />
                                <span className={this.state.nameError !== '' ? "negativeFeedback" : "positiveFeedback"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    {this.state.nameError}
                                </span>
                            </label>

                            <label id="labelForm">
                                Password:
                                <input 
                                    className = "input__signup"
                                    type="password" 
                                    value = {this.state.password} 
                                    placeholder="Your password here" 
                                    name="password" 
                                    onBlur={this.validatePassword} 
                                    onFocus={() => this.setState({passwordError: ""})} 
                                    onChange={this.handleInputChange}
                                />
                                <span className={this.state.passwordError !== '' ? "negativeFeedback" : "positiveFeedback"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} color="red" /> 
                                    {this.state.passwordError}
                                </span>                          
                            </label> 

                            <label id="labelForm">
                                Email:
                                <input 
                                    className = "input__signup"
                                    type="text" 
                                    value = {this.state.email} 
                                    placeholder="Your email here" 
                                    name="email" 
                                    onBlur={this.validateEmail} 
                                    onFocus={() => this.setState({emailError: ""})} 
                                    onChange={this.handleInputChange}
                                />
                                <span className={this.state.emailError !== '' ? "negativeFeedback" : "positiveFeedback"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} color="red" /> 
                                    {this.state.emailError}
                                </span>
                            </label>
                            <button disabled = {!this.state.formIsValid}> 
                                <span>Sign Up</span>
                            </button>
                            <a href="localhost:3000/signup/#">Já tem conta? Clique aqui para acessar.</a>
                        </form>
                    </div>
                </section>
            </>
        );
  }
}
export default withRouter(Signup)