import React, { useEffect} from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Loader } from '../components/Loader';
import { addFavourite, deleteFavourite, loadMovie } from '../redux/actions';


const FilmPage = ({film, sessionId, load, deleteFavourite, addFavourite})=> {
    const {id} = useParams();
    const favHandler = (e)=>{
        try{
            film.favourite ? deleteFavourite(id):
                            addFavourite(id);
        }catch(e){
            console.log(e.message);
        }        
    }
    useEffect(()=>{        
        let clear = true;
        if (clear && (!film || id != film.id)) {            
            load(id);        
        }
        window.scrollTo(0,0);
        return ()=>{
            clear=false;
        }
    }, [id, load]);

    if(!film.title){
        return (
            <Loader/>
        )
    }
    return (
        
      <div className="App container my-5 py-5">
          <h1>{film.title}</h1>
        <div className="card my-3" >
            <div className="row g-0 d-flex align-items-center">                
                <div className="col-12 col-lg-4 my-3 ">
                    <img src={`http://image.tmdb.org/t/p/w342/${film.poster_path}`} className="img-fluid rounded-start" alt="..."/>
                    <p className="fs-5 fw-light fst-italic my-3">{film.tagline}</p>
                </div>
                <div className="col-12 col-lg-8 d-flex align-items-center position-relative">    
                
                {sessionId && <button className="favbtn btn btn-outline-danger position-absolute" 
                                    onClick={favHandler}>
                                    {film.favourite ? "Удалить из избранного":"Добавить в избранное"}
                                </button>}
                    <div className="card-body">
                        <ul className="text-start" style={{listStyleType:'none'}}>
                            <li>
                                <p><span className='fw-bold'>Дата выхода: </span>{film.release_date}</p>                             
                            </li>
                            <li className="mb-3"><span className='fw-bold'>Жанры: </span>{film.genres.map((e,i)=>{
                                if(!i)
                                    return e.name;
                                return ', '+e.name;
                            })}
                            </li>
                            <li className="mb-3"><span className='fw-bold'>{film.production_countries.length>1 ? "Страны" :"Страна"} : </span>{film.production_countries.map((e,i)=>{
                                if(!i)
                                    return e.name;
                                return ', '+e.name;
                            })}
                            </li>
                            <li className="mb-3"><span className='fw-bold'>Актеры: </span>{film.actors.map((e,i)=>{
                                if(!i)
                                    return e;
                                return ', '+e;
                            })}
                            </li>
                            <li>
                                <p><span className='fw-bold'>Бюджет : </span>{film.budget ? film.budget/(10**6)+"млн" : " - "}</p>
                            </li>
                            <li>
                                <p><span className='fw-bold'>Средняя оценка: </span>{film.vote_average}/10</p>
                            </li>
                            
                            <li>
                                <p className="card-text "><span className='fw-bold'>Описание: </span>{film.overview}</p>
                            </li>
                        </ul>                   
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
const mapStateToProps = (state)  =>{
    return {
      film:state.movies.current,
      sessionId:state.user.sessionId
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        deleteFavourite: (id)=>{dispatch(deleteFavourite(id))},
        addFavourite: (id)=>{dispatch(addFavourite(id))},
        load:(id)=>{dispatch(loadMovie(id))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);