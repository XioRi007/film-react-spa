import { LOAD_MOVIE, LOAD_PAGE , CHANGE_STATUS, SET_LOADER} from "./types";

const initialState = {
    currentPage:1,
    all:[],
    current:{},
    loading:false
};
export const moviesReducer = (state=initialState, action)=>{
    const curr = state.currentPage;
    switch(action.type){
        case LOAD_PAGE:{
            //  if(curr !== action.loadedPage) return state
             console.log('loading '+ curr + ' page');
            return {...state, all:state.all.concat([...action.payload]), currentPage: curr+1}
        }        
        case LOAD_MOVIE:{
            return {...state, current:action.payload}
        }       
        case CHANGE_STATUS:{
            return {...state, current:{...state.current, favourite:action.payload}}
        } 
        case SET_LOADER:{
            return {...state, loading:action.payload}
        }

        default:
            return state
    }
}
