import React from "react";
import "./style.css";

class Navbar extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navigation">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="./public/index.html">
              College project
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
