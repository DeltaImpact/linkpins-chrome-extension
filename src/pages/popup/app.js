import React, { Component } from "react";
import { connect } from "react-redux";
import * as uiActions from "../../store/actions/popup/actions";
import { authActions } from "../../store/actions/account.actions";
import { bindActionCreators } from "redux";
import { NavMenu } from "../../components/NavMenu";
import { Login } from "../../components/Login";

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

  // static propTypes = {
  //   backgroundCounter: PropTypes.number.isRequired,
  //   uiCounter: PropTypes.number.isRequired,
  //   incrementUICounter: PropTypes.func.isRequired,
  //   decrementUICounter: PropTypes.func.isRequired
  // };

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
    let { user } = this.props.account;
    // let user = null;
    // const {
    //   backgroundCounter,
    //   uiCounter,
    //   incrementUICounter,
    //   decrementUICounter
    // } = this.props;
    return (
        <div >
          <NavMenu />
          {user ? (
            <React.Fragment>
              {/* <div>Background counter: {backgroundCounter}</div>
        <div>
          UI counter: {uiCounter}
          <div>
            <button onClick={decrementUICounter}>-</button>
            <span> </span>
            <button onClick={incrementUICounter}>+</button>
          </div>
        </div> */}
              {/* <span>{JSON.stringify(this.props)}</span> */}
              <div>{JSON.stringify(this.props)}</div>
              {/* <pre>{JSON.stringify(this.props)}</pre> */}
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
            </React.Fragment>
          ) : (
            <div>
              {/* <div className="state">{JSON.stringify(this.props)}</div> */}

              <Login />
            </div>
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
