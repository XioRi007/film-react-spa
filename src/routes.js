import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Favourites from './Pages/Favoutites'
import FilmPage from './Pages/FilmPage'
import Main from './Pages/Main'
import { User } from './Pages/User'



export const useRoutes = isLogged => {
  if (isLogged) {
    return (
      <Switch>
          <Route path="/user/:id/favourites">
              <Favourites/>
          </Route>
          <Route path="/film/:id">
              <FilmPage/>
          </Route>
          <Route path="/user/:id">
              <User/>
          </Route>     
          <Route path="/">
              <Main/>
          </Route>       
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/film/:id">
              <FilmPage/>
          </Route>
      <Route path="/">
              <Main/>
          </Route>
      <Redirect to="/" />
    </Switch>
  )
}