import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllStaff } from "../../redux/allStaffSlice";
import styled from 'styled-components';

const AddStaffContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  justify-content: center;
  text-align: center;
  form {
    width: 20rem;
    height: 100%;
    padding-top: 2rem;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    h1 {
      padding-bottom: 1rem;
    }
    .inputArea {
      display: flex;
      flex-direction: column;
      label {
        text-align: left;
      }
      input {
        height: 2.5rem;
        padding: 0 1rem;
        background-color: #e6e5e6;
        border: solid 1px #434a54;
        border-radius: 5px;
      }
    }
    .addButton {
      height: 3.5rem;
      font-size: 1.5rem;
      font-family: 'Open Sans';
      font-weight: 600;
      color: white;
      background-color: #b14d59;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`
// import { addNewStaff } from "../../redux/allStaffSlice";

const staffRegister = createAsyncThunk("auth/staffRegister", async({ staffName, email, password, bio }) => {
// const staffRegister = createAsyncThunk("auth/staffRegister", async({ staffName, email, password, bio, avatar }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/staffRegister", { staffName, email, password, bio });
    // const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/staffRegister", { staffName, email, password, bio, avatar });
    return res.data; // accessToken & refreshToken
  } catch(error) {
    console.log(error);
  }
});

const AddStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ newStaffInfo, setNewStaffInfo ] = useState({
    staffName: "",
    email: "",
    password: "",
    bio: "",
    // avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaffInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(staffRegister(newStaffInfo))
      .then(() => dispatch(getAllStaff()))
      .then(() => navigate('/admindashboard'))
      .catch((error) => {
        console.log(error);
    });
    // dispatch(addNewStaff(newStaffInfo));
    // navigate('/admindashboard');
  };

  return (
    <AddStaffContainer>
      <form onSubmit={handleSubmit}>
        <h1>ADD NEW STAFF</h1>
        <div className='inputArea'>
          <label>Staff name</label>
          <input
            onChange={handleChange}
            type='text'
            id='staffName'
            name='staffName'
            placeholder='Staff name'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Email adress</label>
          <input
            onChange={handleChange}
            type='text'
            id='email'
            name='email'
            placeholder='Email adress'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Password</label>
          <input
            onChange={handleChange}
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Bio</label>
          <input
            onChange={handleChange}
            type='text'
            id='bio'
            name='bio'
            placeholder='Staff bio'
          />
        </div>
        {/* <div>
          <label>Avatar</label>
          <input
            onChange={handleChange}
            type='file'
            id='avatar'
            name='avatar'
            accept="image/*"
            placeholder='Staff avatar'
          />
        </div> */}
        <button className='addButton'>Add new staff</button>
      </form>
    </AddStaffContainer>
  )
}

export default AddStaff