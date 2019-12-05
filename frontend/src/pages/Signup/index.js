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
            name:{
                value:'',
                error:'',
                touched:false
            }, 
            password:{
                value:'',
                error:'',
                touched:false
            }, 
            email:{
                value:'',
                error:'',
                touched:false
            },
            formIsValid: false
        }
    }
    
    formValidate = () => {
        if( this.state.name.value !== "" && this.state.password.value !== "" && this.state.email.value !== "" && this.state.name.error === '' && this.state.password.error === '' && this.state.email.error === '' ){
            this.setState({formIsValid: true})
        }else{
            this.setState({formIsValid: false})
        }
    }
    validateName = (name) => {
        if(!name || name.trim() === ''){
            return "Please type your name";
        }
        return "";
    }
    validatePassword = (password) => {
        if(!password || password.trim() === ''){
            return "Please type your password";
        }
        else if(password.length < 6){
            return "Your password must be longer than 6 characters";
        }
        return "";
    }    
    validateEmail = (email) => {
        if(!email || email.trim() === ''){
            return "Please type your email";
        }else if (email.indexOf(['@ifms.edu.br']) === -1){
            return 'Please enter an email with the termination "@ifms.edu.br"';
        }
        return "";
    }
    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let newState = {
            value:value,
            error:this.validateName(value),
            touched:this.state[name].touched
        };
        if(name === "name" ){
            newState.error = this.validateName(value);
        }else if(name === "password"){
            newState.error = this.validatePassword(value);
        }else if(name === "email"){
            newState.error = this.validateEmail(value);
        }
        this.setState(
            (prevState)=>{
                return {
                    ...prevState,
                    [name]:{...newState}
                };
            }
        )
        this.formValidate();
    }
    handleOnBlur = (event) => {
        const name = event.target.name;
        this.setState((prevState) => {
            return {
                ...prevState,
                [name]:{
                    ...prevState[name],
                    touched:true
                }
            }
        });
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
                                    value = {this.state.name.value} 
                                    placeholder="Your name here" 
                                    name="name" 
                                    onBlur={this.handleOnBlur}
                                    onChange = {this.handleInputChange} 
                                />
                                <span className={this.state.name.error !== '' && this.state.name.touched === true ? "negativeFeedback" : "positiveFeedback"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    {this.state.name.error}
                                </span>
                            </label>

                            <label id="labelForm">
                                Password:
                                <input 
                                    className = "input__signup"
                                    type="password" 
                                    value = {this.state.password.value}
                                    placeholder="Your password here" 
                                    name="password" 
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleOnBlur}
                                />
                                <span className={(this.state.password.error !== '' && this.state.password.touched === true) ? "negativeFeedback" : "positiveFeedback"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} color="red" /> 
                                    {this.state.password.error}
                                </span>                          
                            </label> 

                            <label id="labelForm">
                                Email:
                                <input 
                                    className = "input__signup"
                                    type="text" 
                                    value = {this.state.email.value} 
                                    placeholder="Your email here" 
                                    name="email" 
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleOnBlur}
                                />
                                <span className={this.state.email.error !== '' && this.state.email.touched === true ? "negativeFeedback" : "positiveFeedback"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} color="red" /> 
                                    {this.state.email.error}
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