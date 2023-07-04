import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineUserDelete } from 'react-icons/ai';
import { getAllStaff } from "../../redux/allStaffSlice";
import { deleteStaffInfo } from "../../redux/allStaffSlice";
import styled from 'styled-components';

const AdminStaffCardContainer = styled.div`
  position: relative;
  width: 30rem;
  height: 100%;
  padding: 2rem;
  background-color: white;
  border: solid 1px #434a54;
  border-radius: 5px;
  form {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .inputArea {
      width: 100%;
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
    .updateButton {
      width: 70%;
      height: 2.5rem;
      margin-top: 1rem;
      font-size: 1.2rem;
      font-family: 'Open Sans';
      font-weight: 600;
      color: white;
      background-color: #b14d59;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .deleteButton {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    color: white;
    background-color: #b14d59;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`

const updateStaffProfile = createAsyncThunk("staff/updateStaffProfile", async({ id, staffName, email, bio }) => {
  try {
    const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/staff/updateStaffProfile", { id, staffName, email, bio });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const deleteStaffProfile = createAsyncThunk("booking/deleteBooking", async( id ) => {
  try {
    //not delete, use post request
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/staff/deleteStaffProfile", { id });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const AdminStaffCard = (data) => {
  const dispatch = useDispatch();

  const [ updateInfo, setUpdateInfo ] = useState({
    id: data.data._id,
    staffName: data.data.staffName,
    email: data.data.email,
    bio: data.data.bio
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStaffProfile(updateInfo))
      .then(() => dispatch(getAllStaff()))
      .catch((error) => {
        console.log(error);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteStaffProfile(data.data._id));
    dispatch(deleteStaffInfo(data.data._id));
  }

  return (
    <AdminStaffCardContainer>
      <form onSubmit={handleSubmit}>
        <div className='inputArea'>
          <label>Staff name</label>
          <input
            onChange={handleChange}
            type='text'
            id='staffName'
            name='staffName'
            value={updateInfo.staffName}
            placeholder='Staff name'
          />
        </div>
        <div className='inputArea'>
          <label>Email adress</label>
          <input
            onChange={handleChange}
            type='text'
            id='email'
            name='email'
            value={updateInfo.email}
            placeholder='Email adress'
          />
        </div>
        <div className='inputArea'>
          <label>Bio</label>
          <input
            onChange={handleChange}
            type='text'
            id='bio'
            name='bio'
            value={updateInfo.bio}
            placeholder='Staff bio'
          />
        </div>
        <button className='updateButton'>Change staff profile</button>
      </form>
      <button className='deleteButton' onClick={handleClick}>
        <AiOutlineUserDelete />
      </button>
    </AdminStaffCardContainer>
  )
}

export default AdminStaffCard