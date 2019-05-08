import React, { Component } from "react";
import { connect } from "react-redux";
// import { authActions } from "../../actions";
import { NavMenuRight } from "./NavMenuRight";

class NavMenu extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="header">
        <div className="navbar-fixed">
          <div className="navmenu-container">
            <div className="left brand-logo nav__logo black-text ">
              {/* <i className="black-text material-icons hide-on-med-and-down">
                    broken_image
                  </i> */}
              Linkpins
            </div>
            <NavMenuRight />
          </div>
        </div>
      </div>
    );
  }
}

const connectedNavMenuComponent = NavMenu;
export { connectedNavMenuComponent as NavMenu };
