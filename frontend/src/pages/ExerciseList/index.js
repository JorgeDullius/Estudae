import React, { Component } from 'react';
import NavBar from '../../components/Navbar/'
import Drawer from '../../components/Drawer'
import './style.css';

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <>
        <NavBar backgroundColor="#009152"/>
        <Drawer backgroundColor = "black"/>
      </>
    )
  }
}
