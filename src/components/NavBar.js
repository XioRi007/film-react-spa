import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { signIn, signOut } from '../redux/actions';


const NavBar = ({favourites, user, signIn, signOut})=> { 
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary">
          <div className="container mx-auto">
            <div className='row w-100 justify-content-between'>
              <Link className="col-2 navbar-brand text-light my-auto" to="/">Film React SPA</Link>               
                {user && 
                <ul className="col navbar-nav my-1 my-lg-0 d-flex justify-content-end align-items-center" style={{width:"100%"}}>  
                  <li className="nav-item mx-5">
                    <Link className="nav-link text-light position-relative " to="/user/1/favourites">
                      <img src="https://img.icons8.com/ios/30/000000/like--v1.png"/>
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger " style={{top:"1rem", right:"-1rem"}}>
                        {favourites}
                      </span>
                    </Link>
                  </li>
                </ul> } 
                 
              <button className="btn btn-small btn-success col-3 col-sm-2 col-lg-2 col-xl-1" title={user ? "Log out": "Log in"} onClick={()=>{user ? signOut():signIn()}}>{user ? user: "Log in"}</button>              
              </div>
            </div>
      </nav>
    );
  }
  const mapStateToProps = (state)  =>{
    return{
      favourites:state.user.favourites.length,
      user:state.user.userName
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      signOut: ()=>{dispatch(signOut())},
      signIn: ()=>{dispatch(signIn())},
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
//   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//   <span class="navbar-toggler-icon"></span>
// </button>