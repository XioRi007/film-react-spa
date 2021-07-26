import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import NavBar from './components/NavBar';
import { Footer } from './components/Footer';

import { connect } from 'react-redux';
//https://accidental-brash-lace.glitch.me/user/1/favourites
function App({userId}) {
  const isLogged = !!userId;
  const routes = useRoutes(isLogged);
  return (
    <BrowserRouter>  
      <NavBar/>       
        {routes}
      <Footer/>
    </BrowserRouter>
  );
}
const mapStateToProps = (state)  =>{  
  return{
    userId:state.user.userId
  }
}
export default connect(mapStateToProps)(App);