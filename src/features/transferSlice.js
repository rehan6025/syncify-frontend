import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:'idle',
    transferredPlaylist:null,
    error:null
}

const transferSlice = createSlice({
    name:'transfer',
    initialState, 
    reducers:{
        startTransfer: (state)=>{
            state.status = 'loading';
        },
        transferSuccess: (state , action)=>{
            state.status = 'success';
            state.transferredPlaylist = action.payload;
        },
        transferFailed: (state, action)=>{
            state.status = 'failed';
            state.error = action.payload;
        },
        resetTransfer: ()=> initialState,
    }
})

export const {startTransfer , transferSuccess, transferFailed} = transferSlice.actions;
export default transferSlice;