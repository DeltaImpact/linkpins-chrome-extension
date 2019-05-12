import React, { Component } from "react";
import { connect } from "react-redux";
import * as uiActions from "../../store/actions/popup/actions";
import { authActions } from "../../store/actions/account.actions";
import { bindActionCreators } from "redux";
import { NavMenu } from "../../components/NavMenu";
import { Login } from "../../components/Login";
import { Parse } from "../../components/Parse";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: null,
      previewImage: null,
      loadedImages: false,
      favIconUrl: null,
      title: null,
      url: null,
      texts: null
    };
  }

  renderImages() {
    // console.log("renderImages called");

    if (this.state.previewImage == null)
      this.state.previewImage = this.state.images[0].src;

    return this.state.images.map((img, i) => {
      return (
        <li
          key={i}
          className={
            this.state.previewImage == img.src
              ? "square-container square-container-active"
              : "square-container"
          }
          //   onClick={() => this.chooseImage(img)}
        >
          <img
            src={img.src}
            className={
              this.state.previewImage == img.src
                ? "square square-active"
                : "square"
            }
          />
        </li>
      );
    });
  }

  render() {
    let { user } = this.props.account;
    return (
      <div>
        <NavMenu />
        {user ? (
            <Parse />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default connect(
  state => state,
  // mapStateToProps,
  mapDispatchToProps
)(App);

// const mapStateToProps = state => {
//   const { account } = state;
//   return {
//     account
//   };
// };

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...uiActions, ...authActions }, dispatch);
}
