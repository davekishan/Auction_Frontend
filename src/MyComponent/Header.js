import React from 'react'
import {
  NavLink,
  Link
} from "react-router-dom";


export default function Header({ connect, btntext }) {
var wallet;

if(btntext === "Connect Metamask")
{
  wallet=btntext
}
else{
  wallet="Connected to " + btntext.substring(0, 7) + '...' + (btntext.substring(btntext.length - 5));
}

 
  return (
    <nav className="navbar navbar-expand-lg nav-bar-bg">
      <Link to='/'>
      <img src=".//auction_logo.png" href="/" width="250px"></img>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <div className="navbar-nav mr-auto cente">

          <NavLink className="nav-link button" data-text="Awesome" to="/"><span className="actual-text">Add&nbsp;Product&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Add&nbsp;Product&nbsp;</span></NavLink>


          <NavLink className="nav-link button" data-text="Awesome" to="/getproduct"><span className="actual-text">Get&nbsp;Product&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Get&nbsp;Product&nbsp;</span></NavLink>


          <NavLink className="nav-link button" data-text="Awesome" to="/myproduct"><span className="actual-text">My&nbsp;Product&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;My&nbsp;Product&nbsp;</span></NavLink>


          <NavLink className="nav-link button" to="/claimproduct"><span className="actual-text">Claim&nbsp;Product&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Claim&nbsp;Product&nbsp;</span></NavLink>

           
        </div>
        <div>
          <button id="connect-wallet" className='button2' onClick={connect}> {wallet}</button>
        </div>
      </div>
    </nav>
  )
}
