// import React, { Component, PropTypes } from "react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as uiActions from "../../store/actions/popup/actions";
import { authActions } from "../../store/actions/account.actions";
import { bindActionCreators } from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    const redirectRoute = "/";

    // let email = "";
    // chrome.storage.sync.get(["email"], result => {
    //   this.state.email = result.email || "";
    // });

    // let password = "";
    // chrome.storage.sync.get(["password"], result => {
    //   this.state.password = result.password || "";
    // });

    this.state = {
    //   email: email,
    //   password: password,
      email: "12321",
      password: "sdasd",
      email_error_text: null,
      password_error_text: null,
      redirectTo: redirectRoute,
      // disabled: true,
      disabled: false,
      images: null,
      previewImage: null,
      loadedImages: false,
      favIconUrl: null,
      title: null,
      url: null,
      texts: null
    };

    // chrome.storage.onChanged.addListener(this.storageListener);

    // chrome.storage.sync.get(result => {
    //   console.log("state " + JSON.stringify(this.state));
    //   console.log("storage " + JSON.stringify(result));
    // });
  }

  static propTypes = {
    backgroundCounter: PropTypes.number.isRequired,
    uiCounter: PropTypes.number.isRequired,
    incrementUICounter: PropTypes.func.isRequired,
    decrementUICounter: PropTypes.func.isRequired
  };

  //   storageListener(changes, areaName) {
  //     if (changes.images) {
  //       //   this.state.images = changes.images.newValue;
  //       let asdascv = this.state;
  //       debugger;
  //       //   this.state.images = changes.images;
  //     }
  //   }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
    // debugger;
    // chrome.storage.sync.set({ [type]: value }, function() {
    //   console.log(type + "value is set to " + value);
    // });
  }

  login(e) {
    e.preventDefault();
    this.props.login(
      this.state.email,
      this.state.password,
      this.state.redirectTo
    );
  }

  isDisabled() {}

  getTab() {
    let imageGetFunction = function(i) {
      return {
        src: i.src,
        height: i.height,
        width: i.width,
        naturalHeight: i.naturalHeight,
        naturalWidth: i.naturalWidth,
        x: i.x,
        y: i.y
      };
    }.toString();

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      tabs => {
        chrome.tabs.executeScript(
          tabs[0].id,
          {
            code:
              "Array.prototype.map.call(document.images, " +
              imageGetFunction +
              ");"
          },
          results => {
            if (chrome.runtime.lastError) {
              console.error("Couldn't execute the script at all");
            } else if (typeof results[0] === "undefined") {
              console.error("Couldn't find what we wanted");
            } else {
              //   console.log("Loaded images: " + results[0].length);
              this.state.title = tabs[0].title;
              this.state.url = tabs[0].url;
              this.state.images = [{ src: tabs[0].favIconUrl }, ...results[0]];
              console.log(this.state);
            }
          }
        );

        chrome.tabs.executeScript(
          tabs[0].id,
          {
            code: "document.body.innerText;"
          },
          results => {
            if (chrome.runtime.lastError) {
              console.error("Couldn't execute the script at all");
            } else if (typeof results[0] === "undefined") {
              console.error("Couldn't find what we wanted");
            } else {
              var elements = results[0]
                .split("\n")
                .map(e => e.trim())
                .filter(e => e.length > 80);

              this.state.texts = elements;
              console.log(this.state);
            }
          }
        );
      }
    );
  }

  renderImages() {
    console.log("renderImages called");

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
    const {
      backgroundCounter,
      uiCounter,
      incrementUICounter,
      decrementUICounter
    } = this.props;

    return (
      <div style={{ width: 400 }}>
        {/* <div>Background counter: {backgroundCounter}</div>
        <div>
          UI counter: {uiCounter}
          <div>
            <button onClick={decrementUICounter}>-</button>
            <span> </span>
            <button onClick={incrementUICounter}>+</button>
          </div>
        </div> */}
        {JSON.stringify(this.props)}
        <div>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  value={this.state.email}
                  onChange={e => this.changeValue(e, "email")}
                />
                <label
                  htmlFor="email"
                  className={this.state.email != null ? "active" : ""}
                >
                  Email
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pass"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.changeValue(e, "password")}
                />
                <label
                  htmlFor="pass"
                  className={this.state.password != null ? "active" : ""}
                >
                  Password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col m12">
                <div className="col s10  offset-s1">
                  <button
                    type="button"
                    name="action"
                    onClick={e => this.login(e)}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button type="button" name="getTab" onClick={e => this.getTab(e)}>
          getTab
        </button>
        {/* {JSON.stringify(this.state.images)} */}
        <div className="container">
          <div className="row">
            {this.state.images ? (
              <div className="col m5 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Choose image</h6>
                </div>
                <ul>{this.renderImages()}</ul>
              </div>
            ) : (
              <div className="col m5 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Load images</h6>
                </div>
              </div>
            )}

            {/* {this.props.parsing.page && (
              <div className="col m6 offset-m1 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Choose description</h6>
                </div>
                <ul>{this.renderPossibleDescriptions()}</ul>
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

// export default connect(
//   state => state,
//   uiActions
// )(App);

export default connect(
  state => state,
  mapDispatchToProps
  // uiActions
)(App);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...uiActions, ...authActions}, dispatch);
}
