import React, { Component } from "react";

class DescriptionTab extends Component {
  constructor(props) {
    super(props);
  }

  renderDescriptions() {
    return this.props.texts.map((text, i) => {
      let liClass = "description__container";
      if (
        this.props.previewDescription &&
        this.props.previewDescription == text
      )
        liClass += " description__container--active";
      return (
        <div key={i}>
          <li
            key={i}
            className={liClass}
            onClick={() => this.props.chooseDescription(text)}
          >
            <div className={this.props.previewDescription == text ? "" : ""}>
              {text}
            </div>
          </li>
          <div className="divider" />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.texts && (
          <div>
            <div className="card-content list__title">
              <h6 className="left-align list__item">Choose description</h6>
            </div>
            <ul>{this.renderDescriptions()}</ul>
          </div>
        )}
        {this.props.error && (
          <div className="error--container">
            <div className="error error--text alert alert-info">
              {this.props.parse.error}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const connectedNavMenuComponent = DescriptionTab;
export { connectedNavMenuComponent as DescriptionTab };
