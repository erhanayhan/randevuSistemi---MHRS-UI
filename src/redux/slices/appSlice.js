import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    hastane: [],
    doktor:[],
    onlineDoktor:[],
    onlineDoktorFiltre:[],
  },
  reducers: {
    setHastane: (state, action) => {
      // console.log(action.payload);
      state.hastane = action.payload;
    },
    setAddNewHospital: (state, action) => {
      // console.log(action.payload);
      state.hastane = state.hastane.push(action.payload)
    },
    setDoktor: (state, action) => {
      // console.log(action.payload);
      state.doktor = action.payload;
    },
    setAddNewDoktor: (state, action) => {
      // console.log(action.payload);
      state.doktor = state.doktor.push(action.payload)
    },
    setOnlineDoktor: (state, action) => {
      // console.log(action.payload);
      state.onlineDoktor = action.payload;
    },
    setAddNewOnlineDoktor: (state, action) => {
      // console.log(action.payload);
      state.onlineDoktor = state.onlineDoktor.push(action.payload)
    },

    setOnlineDoktorFiltre: (state, action) => {
      // console.log(action.payload);
      state.onlineDoktorFiltre = action.payload;
    },
  
    setAddNewOnlineDoktorFiltre: (state, action) => {
      // console.log(action.payload);
      state.onlineDoktorFiltre = state.onlineDoktorFiltre.push(action.payload)
    },
    setAppointments: (state, action) => {
      // console.log(action.payload);
      state.appointments = action.payload;
    },
  },
});

export const { setHastane, setAddNewHospital } = appSlice.actions;

export const selectHastane = (state) => state.app.hastane;

// ----------------------------------------------------------

export const { setDoktor, setAddNewDoktor} = appSlice.actions;

export const selectDoktor = (state) => state.app.doktor;

// ----------------------------------------------------------

export const { setOnlineDoktor, setAddNewOnlineDoktor} = appSlice.actions;

export const selectOnlineDoktor = (state) => state.app.onlineDoktor;

// ----------------------------------------------------------

export const { setOnlineDoktorFiltre,setAddNewOnlineDoktorFiltre} = appSlice.actions;

export const selectOnlineDoktorFiltre = (state) => state.app.onlineDoktorFiltre;

// ----------------------------------------------------------

export const { setAppointments} = appSlice.actions;

export const selectAppointments = (state) => state.app.appointments;







export default appSlice.reducer;
