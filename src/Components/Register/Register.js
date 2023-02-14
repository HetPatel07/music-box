import axios from "axios";
import React from "react";

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      pass : '',
      confirmPass : '',
      msg: ''
    }
  }

  onEmailChange = (event) =>{
    this.setState({email : event.target.value})
  }
  onPassChange = (event) =>{    
    this.setState({pass : event.target.value})
  }
  onConfirmPassChange = (event) =>{
    this.setState({confirmPass : event.target.value})
  }
  onRegisterBtnClick = async (event) => {      
    event.preventDefault();

    const user = {
      email: this.state.email,
      pass: this.state.pass,
      confirmPass: this.state.confirmPass,
    };

    await axios.post(`http://localhost:3001/register`,  user )
      .then(res => {
        console.log(res);
        this.setState({msg : res.data})
      })
      .catch((error) => {
        // Error
        if (error.response) {            
          this.setState({msg : error.response.data})
            console.log(this.state);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        // console.log(error.config);
    });
    console.log(this.state);    
  }
  render() {
    return (
      <article className="br2 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba   hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPassChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className="b pa2 input-reset ba hover-bg-black hover-white w-100"
                  type="password"
                  name="confirmPassword"
                  id="password"
                  onChange={this.onConfirmPassChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  {this.state.msg}
                </label>                
              </div>
            </fieldset>
            <div className="">
              <input                
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Register"
                onClick={this.onRegisterBtnClick}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                onClick={() => this.props.onRouteChange("signin")}
                className="f6 link dim black db"
              >
                Sign in
              </a>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
