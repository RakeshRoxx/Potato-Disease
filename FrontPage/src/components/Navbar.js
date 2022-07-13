import React from "react";
import "./style.css";

class Navbar extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark navigation">
          <div
            className="collapse navbar-collapse navstyle"
            id="navbarTogglerDemo01"
          >
            Potato Plant Disease Detector
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
