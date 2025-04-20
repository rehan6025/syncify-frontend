import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import playlistsReducer from '../features/playlistsSlice'
import transferReducer from '../features/transferSlice'

export default configureStore({
    reducer:{
        auth: authReducer,
        playlists: playlistsReducer,
        transfer: transferReducer
    }
})