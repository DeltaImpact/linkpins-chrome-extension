import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { Component } from "react";

import { parseActions, boardActions } from "../../store/actions";
import { validateEmail, renderError } from "../../utils/misc";

class Parse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "image",
      email: "user123@yandex.ru",
      password: "123123",
      email_error_text: null,
      password_error_text: null,
      // disabled: true,
      disabled: false
    };
  }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  login(e) {
    e.preventDefault();
    debugger;

    this.props.dispatch(
      authActions.login(
        this.state.email,
        this.state.password,
        this.props.dispatch
      )
    );
  }

  reload(e) {
    this.parse(e);
    this.props.dispatch(
      boardActions.getBoards(this.props.account.user, this.props.dispatch)
    );
  }

  parse(e) {
    e.preventDefault();
    this.props.dispatch(parseActions.parse(this.props.dispatch));

    // this.state.previewImage = null;
    // this.state.previewTitle = null;
    // this.state.previewDescription = null;

    // this.props.parse(this.state.url, this.state.redirectTo);
  }

  setTab(tabName) {
    console.log(1, this.state.currentTab, tabName);
    this.setState({ currentTab: tabName });
    this.state.currentTab = tabName;
    console.log(2, this.state.currentTab, tabName);
  }

  renderImages() {
    // if (this.state.previewImage == null)
    //   this.state.previewImage = this.props.parsing.page.images[0];
    // return this.props.parsing.page.images.map((img, i) => {
    //   return (
    //     <li
    //       key={i}
    //       className={
    //         this.state.previewImage == img
    //           ? "square-container square-container-active"
    //           : "square-container"
    //       }
    //       onClick={() => this.chooseImage(img)}
    //     >
    //       <img
    //         src={img}
    //         className={
    //           this.state.previewImage == img ? "square square-active" : "square"
    //         }
    //       />
    //     </li>
    //   );
    // });
  }

  chooseImage(index) {
    this.setState({
      previewImage: index
    });
  }

  render() {
    return (
      <div className="parse">
        {/* {JSON.stringify(this.props.parse)} */}
        <ul className="tabs z-depth-1">
          <li
            className={`tab ${
              this.state.currentTab == "image" ? "active" : ""
            }`}
            onClick={e => this.setTab("image")}
          >
            <div className="black-text">image</div>
          </li>
          <li
            className={`tab ${
              this.state.currentTab == "description" ? "active" : ""
            }`}
            onClick={e => this.setTab("description")}
          >
            <div className="black-text">description</div>
          </li>
          <li
            className={`tab ${
              this.state.currentTab == "board" ? "active" : ""
            }`}
            onClick={e => this.setTab("board")}
          >
            <div className="black-text">board</div>
          </li>
          <li className="tab" onClick={e => this.reload(e)}>
            <div className="black-text">
              <i className="material-icons">refresh</i>
              reload
            </div>
          </li>
        </ul>
        {this.props.parse.loadingImages ||
          (this.props.parse.loadingTexts && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          ))}
        <div>
          {this.state.currentTab == "image" && this.props.parse.images && (
            <div>
              <div className="card-content list__title">
                <h6 className="left-align list__item">Choose image</h6>
              </div>
              {JSON.stringify(this.props.parse.images)}
              <ul>{this.renderImages()}</ul>
            </div>
          )}
          {this.state.currentTab == "image" && this.props.parse.imagesError && (
            <div className="error--container">
              <div className="error error--text alert alert-info">
                {this.props.parse.imagesError}
              </div>
            </div>
          )}
          {this.state.currentTab == "description" && this.props.parse.texts && (
            <div>
              <div className="card-content list__title">
                <h6 className="left-align list__item">Choose description</h6>
              </div>
              {JSON.stringify(this.props.parse.texts)}
              {/* <ul>{this.renderImages()}</ul> */}
            </div>
          )}
          {this.state.currentTab == "description" &&
            this.props.parse.textsError && (
              <div className="error--container">
                <div className="error error--text alert alert-info">
                  {this.props.parse.textsError}
                </div>
              </div>
            )}
          {this.state.currentTab == "board" &&
            this.props.board.getAllBoardsError &&
            renderError(this.props.board.getAllBoardsError)}
          {this.state.currentTab == "board" && this.props.board.boards && (
            <div>
              <div className="card-content list__title">
                <h6 className="left-align list__item">Choose board</h6>
              </div>
              {JSON.stringify(this.props.board.boards)}
              {/* <ul>{this.renderImages()}</ul> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { parse, board, account } = state;
  return {
    parse,
    board,
    account
  };
}

const connectedNavMenuComponent = connect(mapStateToProps)(Parse);
export { connectedNavMenuComponent as Parse };
