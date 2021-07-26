import React from 'react'
import { connect } from 'react-redux';
import { Film } from '../components/Film';


const Favourites = ({films})=> {

    return (
      <div className="App container my-5 py-5">
        <h3>Понравившееся</h3>
        {!films.length ? <h3>Вы пока не добавили фильм</h3> :
        <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 d-flex row-cols-lg-4 g-3 g-lg-1">
            {films.map((e, i)=>{
                return <Film film={e} key={i}/>
            })}
        </div>}

      </div>
    );
  }

  const mapStateToProps = (state)  =>{
    return {
      films:state.user.favourites
    }
  }
  export default connect(mapStateToProps)(Favourites);