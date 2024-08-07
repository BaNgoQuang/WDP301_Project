import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: {},
    subjects: [],
    listSystemKey: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload
    },
    setListSystemKey: (state, action) => {
      state.listSystemKey = action.payload
    }
  }
})

export default globalSlice
