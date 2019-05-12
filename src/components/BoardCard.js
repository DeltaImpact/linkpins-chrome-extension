import React, { Component } from "react";
import { connect } from "react-redux";

class BoardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { board } = this.props;

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
            <p>{board.description}</p>
          </div>
        </li>
    );
  }
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account
  };
}

const connectedNavMenuComponent = connect(mapStateToProps)(BoardCard);
export { connectedNavMenuComponent as BoardCard };
