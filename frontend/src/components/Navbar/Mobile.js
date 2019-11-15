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
            <li className="navigation__item"><a href="#" className="navigation__link"><span>01</span>Consultar</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link"><span>02</span>Praticar</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link"><span>03</span>Sobre nós</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link"><span>04</span>entrar</a></li>
          </ul>
      </nav>
    </div>
  );
}
