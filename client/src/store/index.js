import {configureStore, createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false
    },
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logout(state){
            localStorage.clear();
            state.isLoggedIn=false
        }
    }
})

const moviesSlice=createSlice({
    name:'movies',
    initialState:{
        moviesList:[]
    },
    reducers:{
        addMovieToWatchList(state,action){
            state.moviesList.push(action.payload)
        },
        removeMovie(state,action){
            const removeItem=state.moviesList.filter((item)=>item.id !== action.payload);
            state.moviesList=removeItem;
        }
    }
})

const userSlice=createSlice({
    name:"user",
    initialState:{
        userDetails:[]
    },
    reducers:{
        setUser(state,action){
            state.userDetails.push(action.payload)
        }
    }
})

export const authActions=authSlice.actions;
export const listActions=moviesSlice.actions;
export const userActions=userSlice.actions;

export const {addMovieToWatchList}=moviesSlice.actions;
export const {removeMovie}=moviesSlice.actions;
export const {setUser}=userSlice.actions;

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        movies:moviesSlice.reducer,
        user:userSlice.reducer
    }
})

/**export const {addMovieToWatchList}=moviesSlice.actions;
export default moviesSlice.reducer;**/