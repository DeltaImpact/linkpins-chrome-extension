import React, { Component } from "react";

class ImageTab extends Component {
  constructor(props) {
    super(props);
  }

  renderImages() {
    return this.props.images.map((img, i) => {
      let liClass = "square-container";
      if (this.props.previewImage && this.props.previewImage == img.src) liClass += " square-container-active";
      return (
        <li
          key={i}
          className={liClass}
          onClick={() => this.props.chooseImage(img.src)}
        >
          <img src={img.src} className="square" />
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.images && (
          <div>
            <div className="card-content list__title">
              <h6 className="left-align list__item">Choose image</h6>
            </div>
            <ul>{this.renderImages()}</ul>
          </div>
        )}
        {this.props.error && (
          <div className="error--container">
            <div className="error error--text alert alert-info">
              {this.props.parse.error}
            </div>
          </div>
        )}
        {/* {JSON.stringify(this.props)} */}
      </div>
    );
  }
}

const connectedNavMenuComponent = ImageTab;
export { connectedNavMenuComponent as ImageTab };
