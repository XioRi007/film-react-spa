import React from 'react'
import { Link } from 'react-router-dom';

//style={{width:"24%"}}
export const Film = ({film})=> {
    return (
        <div className=" col "  >     
          <div className="card h-100">
            <h5 className=" card-title mt-4">{film.title}</h5>  
            <div className="card-body d-flex align-items-end p-3 pt-0" style={{height:'fit-content'}}>  
                <Link to={`/film/${film.id}`} className="stretched-link mx-auto">
                    <img src={`http://image.tmdb.org/t/p/w342/${film.poster_path}`} className="" alt="..." style={{width:'100%'}}/>               
                </Link>              
              <span className="position-absolute top-0 end-0 fs-6 m-1">{film.popularity} &#10084;</span>            
            </div>
            </div>     
        </div>
      
    );
  }
  