import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const employeeState = {
  updateState: false,
  loading: false,
  employeeList: [],
  error: "",
  response: "",
};

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async () => {
    const response = await axios.get("http://localhost:3000/employees");
    console.log(response.data)
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (emp) => {
    console.log(emp);
    const response = await axios.post("http://localhost:3000/employees", emp);
    return response.data;
  }
);

export const removeEmployee = createAsyncThunk(
  "employee/removeEmployee",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/employees/${id}`
    );
    return response.data;
  }
);

export const modifiedEmployee = createAsyncThunk(
  "employee/modifiedEmployee",
  async (emp) => {
    const response = await axios.put(
      `http://localhost:3000/employees/${emp.id}`,emp
    );
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: employeeState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList.push(action.payload);
        state.response = "added";
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.employeeList = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeEmployee.fulfilled, (state, action) => {
      console.log(state);
      console.log(action.meta.arg);
      state.employeeList = state.employeeList.filter(
        (emp) => emp.id != action.meta.arg
      );
      state.response = "deleted";
    });

    builder.addCase(modifiedEmployee.fulfilled, (state, action) => {
      const updateItem = action.payload;
      console.log(updateItem);
      const index = state.employeeList.findIndex(
        (item) => item._id === updateItem._id
      );
      if (index!==-1) {
        state.employeeList[index] = updateItem;
      }
      state.response = "update";
    });
  },
});

export default employeeSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =employeeSlice.actions;