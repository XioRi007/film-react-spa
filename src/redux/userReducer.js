import { ADD_FAVOURITE, DELETE_FAVOURITE, LOAD_FAVOURITES, SIGNIN, SIGNOUT } from "./types";

const initialState = {
    userId:null,
    sessionId:null,
    favourites:[],
    userName:""
};
export const userReducer = (state=initialState, action)=>{
    switch(action.type){
        case SIGNIN:{
            return {...state, ...action.payload}
        }
        case SIGNOUT:{
            return {...initialState}
        }
        case LOAD_FAVOURITES:{
            return {...state, favourites:action.payload}
        }    
        case ADD_FAVOURITE  :{
            return { ...state, favourites: state.favourites.concat([action.payload])}
        }   
        case DELETE_FAVOURITE :{
            state.favourites.splice(action.payload, 1)
            return { ...state};
        }
        
        default:
            return state
    }   
}