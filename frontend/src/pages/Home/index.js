import React from 'react';
import '../../styles/global.css';
import NavBar from '../../components/Navbar';
import './style.css';
import student from '../../assets/image.svg';
import about from '../../assets/about.svg';
import book from '../../assets/book.svg';
import notebook from '../../assets/notebook.svg';
import Button from '../../components/Button';
import teacher from '../../assets/teacher.svg';
import crossPlatform from '../../assets/cross-platform.svg';

export default class Home extends React.Component {
  render(){
    return (
      <>
        <NavBar backgroundColor = "#01579B"/>
        <section className = "header">
          <div className = "header--container">
            <div className = "header--img">
              <img src={student} alt="cara estudando"/>
            </div>
            <div className = "header--textbox">
              <h1>Seu lugar de estudo</h1>
              <p>
                Presentations are communication tools 
                that can be used as demonstrations, 
                lectures, speeches, and more. 
              </p>
              <Button type ="fab"text = "Saiba mais"/>
            </div>
          </div>
        </section>
        <section className = "about">
          <div className="first--about--container">
            <div className = "textbox">
              <h4>Sobre o estudaê</h4>
              <p>
                Presentations are communication tools 
                that can be used as demonstrations, 
                lectures, speeches, reports, and more. 
              </p>
            </div>
            <div className = "img">
              <img src={about} alt=""/>
            </div>
          </div>
          <hr style={{
            backgroundColor: 'black',
            height: 1,
            border:"none",
            width:'70%'
          }}/>
          <div className="second--about--container">
            <div className = "circle-subject"> 
              <div className = "elipse" id="elipse"><img id="subject--image" src={notebook} alt=""></img></div>
              <h5>Conteúdo</h5>
              <h3>
                Presentations are communication tools 
                that can be used as demonstrations, 
                lectures, speeches, reports, and more. 
              </h3>
              <Button type="fab"  text = "Consultar"/>
            </div>
            <div className = "circle-questions">
              <div id="elipse" className = "elipse"><img id="question--image" src={book} alt=""></img></div>
              <h5>Exercícios</h5>
              <h3>
                Presentations are communication tools 
                that can be used as demonstrations, 
                lectures, speeches, reports, and more. 
              </h3>
              <Button type="fab"  text = "Praticar"/>
            </div>
          </div>
          <hr style={{
            backgroundColor: 'black',
            height: 1,
            border:"none",
            width:'70%'
          }}/>

          <div className="third--about--container">
            <div className = "text">
              <h4>Outros recursos</h4>
            </div>
            <div id = "other-features">
              <div id = "first-feature">
                <img src={teacher} alt=""></img>
                <h3 id="text-features">Presentations are communication tools that can be used.</h3>
              </div>
              <div id = "second-feature">
                <img src={crossPlatform} alt=""></img>
                <h3 id="text-features">Presentations are communication tools that can be used.</h3>
              </div >
              <div id = "third-feature">
                <img src={teacher} alt=""></img>
                <h3 id="text-features">Presentations are communication tools that can be used.</h3>
              </div>
            </div>
          </div>
        </section>
        <section id = "section3">
        </section>
      </>
    );
  }
}
