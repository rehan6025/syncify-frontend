import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    playlists:[],
    selectedPlaylist: null,
    status:'idle'
}

const playlistsSlice = createSlice({
    name:'playlists',
    initialState,
    reducers:{
        setPlaylists: (state, action) =>{
            state.playlists = action.payload;
        },
        setSelectedPlaylist: (state, action)=>{
            state.selectedPlaylist = action.payload;
        }
    }
})

export const {setPlaylists , setSelectedPlaylist} = playlistsSlice.actions;
export default playlistsSlice.reducer;