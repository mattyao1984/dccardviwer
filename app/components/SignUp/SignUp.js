import React from 'react';
import _ from 'lodash';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = { };

    this.render = this.render.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  signUp() {

  }

  render () {
    return (
      <div className="page home">
        <div className="container">
          <h2>New user sign up</h2>
          <hr />
          <form>
            <div className="row">
              <div className="col-md-4 col-md-offset-2">
                <div className="form-group">
                  <label for="first_name">First Name: </label>
                  <input type="text" id="first_name" className="form__text-full" placeholder="Enter your first name..." />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label for="last_name">Last Name: </label>
                  <input type="text" id="last_name" className="form__text-full" placeholder="Enter your last name..." />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="form-group">
                  <label for="email">Email: </label>
                  <input type="text" id="email" className="form__text-full" placeholder="Enter your email..." />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="form-group">
                  <label for="ign">Deadman's Cross IGN (optional): </label>
                  <input type="text" id="ign" className="form__text-full" placeholder="Enter your IGN..." />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="form-group">
                  <label for="password">Password: </label>
                  <input type="text" id="password" className="form__text-full" placeholder="Enter your password..." />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="form-group">
                  <label for="confirm_password">Confirm Password: </label>
                  <input type="text" id="confirm_password" className="form__text-full" placeholder="Confirm your password..." />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="form-group">
                  <button type="button" className="btn btn-primary form__button-lg pull-right" data-loading-text="Sign in up..." autocomplete="off" onClick={this.signUp}>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
