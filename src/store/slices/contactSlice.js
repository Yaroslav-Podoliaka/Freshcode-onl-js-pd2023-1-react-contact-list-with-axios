import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactsState from '../../model/initialContacts';
import api from '../../contact-service';
import { WATCH_CONTACTS_SLICE_NAME } from "../../model/constants";

const initialState = {
  contacts: contactsState,
  contactForEdit: createEmptyContact(),
  isFetching: false,
  error: null,
};

export const getContacts = createAsyncThunk(
`${WATCH_CONTACTS_SLICE_NAME}/getContacts`,
async function(_, {rejectWithValue}){
  try {
    const response = await api.get('/');
    if(response.status >= 400){
      throw new Error(`Server error: ${response.status}`);
    }
    const {data} = response;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);

export const addContact = createAsyncThunk(
  `${WATCH_CONTACTS_SLICE_NAME}/addContact`,
  async function(newContact, {rejectWithValue}, dispatch){
    try {
      const {data, status} = await api.post('/', newContact);
      if(status >= 400){
        throw new Error(`Server error: ${status}`);
      }
      dispatch(createContact(data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changedContact = createAsyncThunk(
  `${WATCH_CONTACTS_SLICE_NAME}/changedContact`,
  async function(newUpdateContact, {rejectWithValue}, dispatch){
    try {
      const {data, status} = await api.put(`/${newUpdateContact.id}`,newUpdateContact);
      if(status >= 400){
        throw new Error(`Server error: ${status}`);
      }
      dispatch(updateContact(data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delContact = createAsyncThunk(
  `${WATCH_CONTACTS_SLICE_NAME}/delContact`,
  async function(id, {rejectWithValue, dispatch}){
    try {
      const {status} = await api.delete(`/${id}`);
      if(status >= 400){
        throw new Error(`Server error: ${status}`);
      }
      dispatch(deleteContact(id));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const setFetching = (state) => {
  state.fetching = true;
  state.error = null;
};

const setError = (state, action) => {
  state.fetching = false;
  state.error = action.payload;
}

const contactSlice = createSlice({
  name: WATCH_CONTACTS_SLICE_NAME,
  initialState,
  reducers: {
    createContact(state, {payload}){
      state.contacts.push(payload);
    },
    deleteContact(state, {payload}){
      state.contacts = state.contacts.filter(contact => 
        contact.id !== payload.id);
    },
    updateContact(state, {payload}){
      state.contacts = state.contacts.map((contact) =>
      contact.id !== payload ? contact : payload);
    },
    addNewContact(state){
      state.contactForEdit = createEmptyContact();
    },
    selectContact(state, {payload}){
      state.contactForEdit = payload;
    },
  },
  extraReducers: {
    [getContacts.fulfilled]: (state, {payload}) => {
      state.contacts = payload;
      state.isFetching = false;
      state.error = null;
    },
    
    [getContacts.pending]: setFetching,
    [addContact.pending]: setFetching,
    [changedContact.pending]: setFetching,
    [delContact.pending]: setFetching,
    [getContacts.rejected]: setError,
    [addContact.rejected]: setError,
    [changedContact.rejected]: setError,
    [delContact.rejected]: setError,
  }
});

export const {
  createContact, 
  deleteContact, 
  updateContact,
  addNewContact,
  selectContact
} = contactSlice.actions;

export default contactSlice.reducer;

function createEmptyContact() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
};
