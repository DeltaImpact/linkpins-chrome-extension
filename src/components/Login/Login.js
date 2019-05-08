import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { Component } from "react";

import { authActions } from "../../store/actions";
import { validateEmail, renderError } from "../../utils/misc";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.dispatch(
      authActions.login(
        this.state.email,
        this.state.password,
        this.props.dispatch
      )
    );
  }

  isDisabled() {}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 offset-m4 z-depth-3 card-panel">
            <div className="col hg22 offset-hg1">
              <h4 className="center-align">Login</h4>
              {this.props.account.loginLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              <div>
                <form className="col s12">
                  {this.props.account.loginError &&
                    renderError(this.props.account.loginError)}
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
                          className="btn btn-medium waves-effect waves-light s12"
                          type="button"
                          name="action"
                          disabled={this.props.account.loginLoading}
                          onClick={e => this.login(e)}
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

const connectedNavMenuComponent = connect(
  mapStateToProps
)(Login);
export { connectedNavMenuComponent as Login };
