import React from "react";
import './mobile.css';
export default function MobileAppBar() {
  return (
    <div className="navigation">
      <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />

      <label for="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
          <ul className="navigation__list">
            <li className="navigation__item"><a href="#" className="navigation__link">Consultar</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link">Praticar</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link">Sobre nós</a></li>
            <li className="navigation__item"><a href="http://localhost:3000/signup" className="navigation__link">Entrar</a></li>
          </ul>
      </nav>
    </div>
  );
}
