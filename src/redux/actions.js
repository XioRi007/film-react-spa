import { api_key} from "../config";
import { ADD_FAVOURITE, CHANGE_STATUS, DELETE_FAVOURITE, LOAD_FAVOURITES, LOAD_MOVIE, LOAD_PAGE, SET_LOADER, SIGNIN, SIGNOUT } from "./types";

export const loadPage = ()=>{  
    return async (dispatch, getState) =>{          
        try{
            if(getState().movies.loading) return dispatch({type:"def"})
            const page = getState().movies.currentPage;
            dispatch({type:SET_LOADER, payload:true});
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=64b1bb8a133fcc189b035b4caae6a8de&language=ru&page=${page}`);        
            const json = await res.json();
            dispatch({
                type:LOAD_PAGE,
                payload:[...json.results ],
                loadedPage:page
            })
            dispatch({type:SET_LOADER, payload:false})
        }catch(e){
            console.log(e);
            return dispatch({type:"def"});
        }
    }
}

export const loadMovie = (id) =>{
    return async (dispatch, getState) =>{
        try{
            const session = getState().user.sessionId          
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=ru`);
            const json = await res.json();   
            const favres  = await fetch(`https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${api_key}&session_id=${session}`);
            const {favorite} = await favres.json();     
            
            const actorres = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`);
            let {cast} = await actorres.json();
            cast.splice(4, cast.length-4);
            const actors = cast.map((e)=>{
                return e.name
            })
            

            dispatch({
                type:LOAD_MOVIE,
                payload:{...json, favourite:favorite, actors}
            })
        }catch(e){
            console.log(e);
            return dispatch({type:"def"});
        }
    }
}
export const loadFavourites = ()=>{ 
    return async (dispatch, getState)=>{        
        try{
            const session_id = getState().user.sessionId;
            const id = getState().user.userId
            const response = await fetch(`https://api.themoviedb.org/3/account/${id}/favorite/movies?api_key=${api_key}&language=ru&sort_by=created_at.asc&page=1&session_id=${session_id}`)
            const {results} = await response.json(); 
            dispatch({
                type:LOAD_FAVOURITES,
                payload:results   
            });
        }catch(e){
            console.log(e);
            return dispatch({type:"def"});
        }        
    }
}
export const signIn = ()=>{   
    return async (dispatch)=>{
        try{
            const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`);  
            const {request_token} = await response.json();     
            window.open(`https://www.themoviedb.org/authenticate/${request_token}`);
            alert('Нажмите ОК когда закроете вкладку с авторизацией');            
            const response1 = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${api_key}`, 
                {method:'POST', body:JSON.stringify({request_token}), headers:{'Content-Type':'application/json' }});
            const {session_id} = await response1.json();
            const response2 = await fetch(`https://api.themoviedb.org/3/account?api_key=${api_key}&session_id=${session_id}`)
            const {id, username} = await response2.json();        
            dispatch({
                type:SIGNIN,
                payload:{
                    sessionId:session_id, 
                    userId:id, userName:username
                }        
            })        
            dispatch(loadFavourites());
        }catch(e){
            console.log(e);
            return dispatch({type:"def"});
        }
    }
}
export const signOut = ()=>{
    return {
        type:SIGNOUT
    }
}

export const addFavourite = (movieId)=>{
    return async (dispatch, getState)=>{   
        try{
            const session_id = getState().user.sessionId;
            const id = getState().user.userId     
            await fetch(`https://api.themoviedb.org/3/account/${id}/favorite?api_key=${api_key}&session_id=${session_id}`, {
                method:"POST",
                body:JSON.stringify({
                    "media_type": "movie",
                    "media_id": movieId,
                    "favorite": true
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })           
            dispatch({
                type:ADD_FAVOURITE,
                payload:getState().movies.current
            });
            dispatch({
                type:CHANGE_STATUS,
                payload:true
            });

        }catch(e){
            console.log(e);
            return dispatch({type:"def"})
        }        
    }
}

export const deleteFavourite = (movieId)=>{
    movieId = Number(movieId);
    return async (dispatch, getState)=>{   
        try{
            const session_id = getState().user.sessionId;
            const id = getState().user.userId     
            await fetch(`https://api.themoviedb.org/3/account/${id}/favorite?api_key=${api_key}&session_id=${session_id}`, {
                method:"POST",
                body:JSON.stringify({
                    "media_type": "movie",
                    "media_id": movieId,
                    "favorite": false
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const favs = getState().user.favourites;  
            const index = favs.findIndex((e, i)=>{      
                if(e.id === movieId){
                    return true
                }                    
                return false
            })
            if(index !==-1){
                dispatch({
                    type:DELETE_FAVOURITE,
                    payload:index
                })
                dispatch({
                    type:CHANGE_STATUS,
                    payload:false
                });
            }  
        }catch(e){
            console.log(e);
            return dispatch({type:"def"})
        }        
    }
}
