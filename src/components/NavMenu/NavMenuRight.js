import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { authActions } from "../../actions";

class NavMenuRight extends Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    // this.props.dispatch(authActions.logout());
  }

  render() {
    let { user } = this.props.account;
    //   topbarRight = (
    //     <Fragment>
    //       <li
    //       // className={
    //       //   this.props.history.location.pathname == "/parse" ? "active" : ""
    //       // }
    //       >
    //         <div className="black-text">parse</div>
    //       </li>
    //       <li
    //       // className={
    //       //   this.props.history.location.pathname.startsWith("/profile")
    //       //     ? "active"
    //       //     : ""
    //       // }
    //       >
    //         <div className="pagenav__option--inline black-text">
    //           <i className="large material-icons">perm_identity</i>
    //           {/* {user.username} */}
    //         </div>
    //       </li>
    //       <li
    //       // className={
    //       //   this.props.history.location.pathname == "/settings"
    //       //     ? "active"
    //       //     : ""
    //       // }
    //       >
    //         <div className="pagenav__option--inline black-text">
    //           <i className="large material-icons">settings</i>
    //         </div>
    //       </li>
    //       <li>
    //         <div
    //           className="black-text"
    //           //  onClick={this.handleLogout}
    //         >
    //           logout
    //         </div>
    //       </li>
    //     </Fragment>
    //   );

    return (
      <ul className="navmenu-right">
        {user ? (
          "asdasd"
        ) : (
          <li
            className="active"
            // className={
            //   this.props.history.location.pathname == "/login" ? "active" : ""
            // }
          >
            <div className="black-text ">login</div>
          </li>
        )}
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
