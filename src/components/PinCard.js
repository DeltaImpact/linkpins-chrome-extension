import React, { Component } from "react";
import { connect } from "react-redux";
// import { authActions } from "../../actions";
// import { withRouter } from "react-router";

class PinCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url, title, description } = this.props;

    return (
      <div>
        {/* <div className="z-depth-3"> */}
        {/* <div className="card-panel"> */}
        <div className="">
          <ul className="collection ">
            <li className="collection-item avatar pin-content">
              {/* <div className="col m2"> */}
              {/* <i className="material-icons circle green">insert_chart</i> */}
              <img src={url} className="circle" />
              {/* <img src={this.props.item.images[0]} alt="" className="circle" /> */}
              {/* <img src="https://cdn-images-1.medium.com/letterbox/183/36/50/50/1*mGbzSVmf-HAVTCgvlMcWPg.png?source=logoAvatar-lo_dnt_4JhHhPGMy7hr---138adf9c44c" alt="" className="circle"></img> */}
              {/* </div> */}
              <div className="col m12">
              
                <span className="title">{title}</span>

                <p className="">{description}</p>
              </div>
              {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
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
