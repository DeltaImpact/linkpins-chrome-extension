import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { authActions } from "../../store/actions";

class NavMenuRight extends Component {
  constructor(props) {
    super(props);
  }
  
  logout(e) {
    e.preventDefault();
    this.props.dispatch(
      authActions.logout()
    );
  }

  render() {
    let { user } = this.props.account;
    return user ? (
      <ul className="navmenu-right">
        <li className="active">
          <div
            className="black-text"
          >
            parse
          </div>
        </li>
        <li>
          <div className="black-text" onClick={e => this.logout(e)}>
            logout
          </div>
        </li>
      </ul>
    ) : (
      <ul className="navmenu-right">
        <li className="active">
          <div className="black-text ">login</div>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account
  };
}

const connectedNavMenuComponent = connect(mapStateToProps)(NavMenuRight);
export { connectedNavMenuComponent as NavMenuRight };
