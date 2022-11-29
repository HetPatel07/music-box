import axios from "axios";
import React, { Component } from "react";

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass: '', 
      msg: ''
    }
  }
  onEmailChange = (event) =>{
    this.setState({email : event.target.value})
  }
  onPassChange = (event) =>{    
    this.setState({pass : event.target.value})
  }
  onSigninBtnClick = async (event) => {
    const user = {
      email: this.state.email,
      pass: this.state.pass,      
    };    
    await axios.post(`http://localhost:3001/signin`, user)
      .then(res => {
        console.log(res.data);        
        this.props.onRouteChange('home',res.data);
      })
      .catch((error) => {
        // Error
        if (error.response) {            
          this.setState({msg : error.response.data})
            console.log(error);
        } else if (error.request) {            
            console.log(error.request);
        } else {            
            console.log('Error', error.message);
        }        
    });
  }
  render() {
    const {onRouteChange} = this.props;    
    return (
      <article className="br2 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={this.onEmailChange}
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
                  {this.state.msg}
                </label>                
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Sign in"
                onClick={this.onSigninBtnClick}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db"
              >
                Register
              </a>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Signin;
