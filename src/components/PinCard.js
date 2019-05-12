import React, { Component } from "react";
import { connect } from "react-redux";

class PinCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url, title, description } = this.props;

    return (
      <div>
        <div className="">
          <ul className="collection ">
            <li className="collection-item avatar pin-content">
              <img src={url} className="circle" />
              <div className="col m12"> 
                <span className="title">{title}</span>
                <p>{description}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account
  };
}

const connectedNavMenuComponent = connect(mapStateToProps)(PinCard);
export { connectedNavMenuComponent as PinCard };
