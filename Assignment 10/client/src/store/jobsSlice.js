import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  error: null
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addJobSuccess: (state, action) => {
      state.loading = false;
      state.jobs.push(action.payload);
    },
    addJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  fetchJobsStart, 
  fetchJobsSuccess, 
  fetchJobsFailure,
  addJobStart,
  addJobSuccess,
  addJobFailure
} = jobsSlice.actions;
export default jobsSlice.reducer; 