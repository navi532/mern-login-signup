import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import locationService from './locationService'

const initialState = {
  locations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Get user locations
export const getLocations = createAsyncThunk(
  'locations/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await locationService.getLocations(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        console.log('')
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.locations = action.payload.data
        console.log({message:"FULFILLED",data:action.payload})
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        console.log({message:"REJECTED",data:action.payload})
      })
  },
})

export const { reset } = locationSlice.actions
export default locationSlice.reducer
