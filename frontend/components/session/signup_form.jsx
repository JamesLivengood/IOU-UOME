import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.receiveErrors = this.receiveErrors.bind(this);
  }

  componentDidMount() {
    this.props.clearSessionErrors();
  }

  handleSubmit(e) {
//
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  receiveErrors() {
    if (Object.values(this.props.errors).length > 0) {
      const errorsArr = Object.values(this.props.errors).map((err, idx) => <li key={idx}>{err}</li>);
      return (
        <div className="signup-form-errors">The following errors occurred:<ul>{errorsArr}</ul></div>
      );
    }
  }

  render() {
      return(
        <div className="signup-page">
          <Link to="/">
            <img className="signup-page-logo" src="/assets/logo.png"/>
          </Link>
          <div className="signup-form-box">
            <h3 className="signup-introduce">INTRODUCE YOURSELF</h3>
            {this.receiveErrors()}
            <div className="signup-submit-form">
              <form onSubmit={this.handleSubmit}>
                <div className="signup-hi">Hi there! My name is</div>
                  <input className="signup-name-input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                <div className="signup-email-label">{"Here's my"} <strong>email address:</strong></div>
                  <input className="signup-email-input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                <div className="signup-password-label">{"And here's my"} <strong>password:</strong></div>
                  <input className="signup-password-input" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="signup-submit-button">Sign me up!</button>
              </form>
              <button onClick={() => this.props.demoLogin()} className="jamie-lannister-button">Demo Login to Jamie Lannister&apos;s Top Secret Account</button>
            </div>
          </div>
        </div>
      );
  }
}


export default SignupForm;
