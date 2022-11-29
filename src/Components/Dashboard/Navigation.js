import React from "react"
const Nav = ({onRouteChange,onHomeRouteChange,email})=>{
    return(
        <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l ">
            <nav className="f6 fw6 ttu tracked">
                <p className="link dim white dib mr3 pointer" onClick={() => onHomeRouteChange('home')}>Home</p>
                <p className="link dim white dib mr3">Your Playlists</p>
                <p className="link dim white dib mr3 pointer" onClick={() => onHomeRouteChange('favourites')}>Favourites</p>
                <p className="link dim white dib mr3 tr">Hello, <br/> {email}</p>                
                <p className="link dim white dib mr3 tr" onClick={()=>onRouteChange('signout')}>Logout</p>
            </nav>
      </header>
    )
}

export default Nav;