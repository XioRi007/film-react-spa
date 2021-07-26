import React from 'react'
import { Link } from 'react-router-dom';


export const Footer = ()=> {
    return (
        <footer className="text-center text-lg-start bg-light text-muted mt-5">    
        
          <section className="p-4 border-top">
            <div className="container text-center text-md-start mt-3">
             
              <div className="row mt-3">
               
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
               
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>Film React SAP
                  </h6>
                  <p>
                    Simple application for trainig with react-redux using TMDB API.
                  </p>
                </div>    
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">               
                  <h6 className="text-uppercase fw-bold mb-4">
                    Useful links
                  </h6>
                  <p>
                    <Link to="/" className="text-reset">Главная</Link>
                  </p>
                </div>            
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">                
                  <h6 className="text-uppercase fw-bold mb-4">
                    Contact
                  </h6>
                  <p>
                    <i className="me-3"></i>
                    maria.barnash@gmail.com
                  </p>
                  <p><i className="me-3"></i> + 380982543586</p>
                </div>              
              </div>            
            </div>
          </section>         
          <div className="text-center p-4 border-top" >
            © 2021 Copyright:
            <Link className="text-reset fw-bold" to="https://mdbootstrap.com/"></Link>
          </div>
        </footer>
    );
  }