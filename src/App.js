import "./App.css";
import React from "react";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import Home from "./Components/Dashboard/Home";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      route : 'signin', 
      isSignedIn: false,
      user: []
    }
  }
  onRouteChange = async (route,user) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false,route: 'signin'})
      return;      
    } else if (route === 'home') {            
      await this.setState({isSignedIn: true, user: user})
    }
    this.setState({route : route})
  }

  render() {    
    return (
      <div className="App">
      {
        this.state.route === 'signin' ? 
        <Signin onRouteChange = {this.onRouteChange}/> :
          this.state.route === 'home' ? <Home user = {this.state.user} onRouteChange = {this.onRouteChange}/> :
          <Register onRouteChange = {this.onRouteChange} onRegisterBtnClick = {this.onRegisterBtnClick} />
      }
      </div>
    );
  }
}

export default App;
