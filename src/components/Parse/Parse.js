import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { Component } from "react";

import { parseActions, boardActions } from "../../store/actions";
import { PinCard } from "../PinCard";
import { BoardCard } from "../BoardCard";
import { validateEmail, renderError } from "../../utils/misc";
import { ImageTab } from "./tabs/ImageTab";
import { DescriptionTab } from "./tabs/DescriptionTab";

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
      disabled: false,
      previewTitle: null,
      previewImage: null,
      previewDescription: null
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

    this.state.previewImage = null;
    this.state.previewTitle = null;
    this.state.previewDescription = null;

    this.props.dispatch(parseActions.parse(this.props.dispatch));
  }

  setTab(tabName) {
    this.setState({ currentTab: tabName });
  }

  renderDescriptions() {
    if (this.state.previewDescription == null)
      this.state.previewDescription = this.props.parse.texts[0];
    return this.props.parse.texts.map((text, i) => {
      return (
        <div key={i}>
          <li
            key={i}
            className={
              this.state.previewDescription == text
                ? "description__container--active description__container"
                : "description__container"
            }
            onClick={() => this.chooseDescription(text)}
          >
            <div className={this.state.previewDescription == text ? "" : ""}>
              {text}
            </div>
          </li>
          <div className="divider" />
        </div>
      );
    });
  }

  chooseDescription(index) {
    this.setState({
      previewDescription: index
    });
  }

  renderBoards() {
    return this.props.board.boards.map((board, i) => {
      return <BoardCard board={board} />;
      //   return this.renderBoard(board);
    });
  }

  renderBoard(board) {
    return (
      <li
        key={board.id}
        className="collection-item avatar pin-content"
        // onClick={() => this.savePin(board.id, board.name)}
      >
        {board.img == null ? (
          <i className="material-icons circle green">folder</i>
        ) : (
          <img src={board.img} alt="" className="circle" />
        )}
        <div className="col m12">
          <span className="title">{board.name}</span>
          <p className="">{board.description}</p>
          {/* <p className="">
            Last change{" "}
            {board.modified
              ? distanceInWordsToNow(board.modified)
              : distanceInWordsToNow(board.created)}
          </p> */}
        </div>
      </li>
    );
  }

  chooseImage = imageSrc => {
    this.setState({
      previewImage: imageSrc
    });
  };

  chooseDescription = text => {
    this.setState({
      previewDescription: text
    });
  };

  render() {
    if (this.state.previewDescription == null && this.props.parse.texts)
      this.state.previewDescription = this.props.parse.texts[0];

    if (this.state.previewImage == null && this.props.parse.images)
      this.state.previewImage = this.props.parse.images[0].src;

    if (this.state.previewTitle == null && this.props.parse.title)
      this.state.previewTitle = this.props.parse.title;

    return (
      <div className="parse">
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
          {this.state.currentTab == "image" && (
            <ImageTab
              images={this.props.parse.images}
              error={this.props.parse.imagesError}
              previewImage={this.state.previewImage}
              chooseImage={this.chooseImage}
            />
          )}
          {this.state.currentTab == "description" && this.props.parse.texts && (
            <DescriptionTab
              texts={this.props.parse.texts}
              error={this.props.parse.textsError}
              previewDescription={this.state.previewDescription}
              chooseDescription={this.chooseDescription}
            />
          )}

          {this.state.currentTab == "board" &&
            this.props.board.getAllBoardsError &&
            renderError(this.props.board.getAllBoardsError)}
          {this.state.currentTab == "board" && this.props.board.boards && (
            <div>
              <div className="card-content list__title">
                <h6 className="left-align list__item">Pin preview</h6>
              </div>
              <PinCard
                url={this.state.previewImage}
                title={this.state.previewTitle}
                description={this.state.previewDescription}
              />
              <div className="card-content list__title">
                <h6 className="left-align list__item">Save to board</h6>
              </div>
              <ul className="collection ">
                {/* <li class="collection-item avatar pin-content board__card">
                  <div class="board__card__content col m12">
                    <div>
                      <a href="/pin/10004">
                        <img
                          src="https://lorempixel.com/100/190/nature/6"
                          alt=""
                          class="circle"
                        />
                        <div class="title board__card__text--short">
                          Cards - Materialize
                        </div>
                        <p class="board__card__text--short">
                          Cards are a convenient means of displaying content
                          composed of different types of objects. They’re also
                          well-suited for presenting similar objects whose size
                          or supported actions can vary considerably, like
                          photos with captions of variable length.
                        </p>
                      </a>
                      <a href="https://materializecss.com/cards.html" class="">
                        <span class="board__misc board__card__text--short">
                          https://materializecss.com/cards.html
                        </span>
                      </a>
                      <div class="board__misc">
                        <div class="board__misc">
                          <span class="board__misc__item--time">
                            Last change 4 months
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li> */}

                {this.renderBoards()}
              </ul>
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
