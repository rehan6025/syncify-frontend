import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    spotifyConnected: null,
    youtubeConnected: null,
    status: 'disconnected'
};

const authSlice = createSlice({
    name:'auth',
    initialState, 
    reducers:{
        setSpotifyConnected: (state, action)=>{
            state.spotifyConnected = action.payload;
            state.status = 'connected';
        },
        setYoutubeConnected: (state, action)=>{
            state.youtubeConnected = action.payload;
        },
        logout: (state) => {
            state.spotifyConnected = null;
            state.youtubeConnected = null;
            state.status = 'disconnected';
        }
    }
})


export const { setSpotifyConnected , setYoutubeConnected , logout} = authSlice.actions;
export default authSlice.reducer;