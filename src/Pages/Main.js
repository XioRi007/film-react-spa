import React, { useCallback, useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { Film } from '../components/Film';
import { Loader } from '../components/Loader';
import { ScrollUp } from '../components/ScrollUp';
import {  loadPage } from '../redux/actions';

const Main = ({nextPage, films, loadPage})=> { 
  const [load, setLoad ] = useState(false);  
  const scrollHandler = useCallback(()=>{
    const container = document.querySelector('#main');
    if(!container) return
    if (container.getBoundingClientRect().bottom <= window.innerHeight) {    
     setLoad(true);
    } 
  }, []);
  useEffect(()=>{
    loadPage();
    window.addEventListener('scroll', scrollHandler);
    return ()=>{
      window.removeEventListener('scroll', scrollHandler);
    }
  }, [loadPage, scrollHandler]);

  useEffect(()=>{    
    if(load ){   
      loadPage();
      setLoad(false);      
    }  
    return ()=> {
      setLoad(false);
    }
  }, [load, loadPage]);
  if(!films.length){
    return <Loader/>
  }
      return (
        <div className="App container mt-5" id="main">     
        <ScrollUp/>
          <h3 className="mt-5 py-5">Популярное</h3>
        <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 d-flex row-cols-lg-4 g-3 g-lg-1">
          {films.map((e,i)=>{
            return <Film film={e} key={i}/>
          })}
        </div>
        </div>
      );
}
const mapStateToProps = (state)  =>{
  return {
    nextPage:state.movies.currentPage,
    films:state.movies.all
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      loadPage: ()=>{dispatch(loadPage())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);