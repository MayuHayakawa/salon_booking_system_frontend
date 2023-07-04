import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai';
import { getMenu } from '../../redux/menuSlice';
import { deleteMenuInfo } from "../../redux/menuSlice";
import styled from 'styled-components';

const AdminMenuCardContainer = styled.div`
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

const updateMenu = createAsyncThunk("menu/updateMenu", async({ id, menuname, duration, price, description }) => {
  try {
    const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/menu/updateMenu", { id, menuname, duration, price, description });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const deleteMenu = createAsyncThunk("menu/deleteMenu", async( id ) => {
  try {
    //not delete, use post request
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/menu/deleteMenu", { id });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const AdminMenuCard = (data) => {
  const dispatch = useDispatch();

  const [ updateInfo, setUpdateInfo ] = useState({
    id: data.data._id,
    menuname: data.data.menuname,
    duration: data.data.duration,
    price: data.data.price,
    description: data.data.description
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMenu(updateInfo))
      .then(() => dispatch(getMenu()))
      .catch((error) => {
        console.log(error);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteMenu(data.data._id));
    dispatch(deleteMenuInfo(data.data._id))
  }

  return (
    <AdminMenuCardContainer>
      <form onSubmit={handleSubmit}>
        <div className='inputArea'>
          <label>Menu name</label>
          <input
            onChange={handleChange}
            type='text'
            id='menuname'
            name='menuname'
            value={updateInfo.menuname}
            placeholder='Menu name'
          />
        </div>
        <div className='inputArea'>
          <label>Duration (min)</label>
          <input
            onChange={handleChange}
            type='number'
            id='duration'
            name='duration'
            value={updateInfo.duration}
            placeholder='Duration'
          />
        </div>
        <div className='inputArea'>
          <label>Price</label>
          <input
            onChange={handleChange}
            type='number'
            id='price'
            name='price'
            value={updateInfo.price}
            placeholder='Price'
          />
        </div>
        <div className='inputArea'>
          <label>Description</label>
          <input
            onChange={handleChange}
            type='text'
            id='description'
            name='description'
            value={updateInfo.description}
            placeholder='Description'
          />
        </div>
        <button className='updateButton'>Change menu</button>
      </form>
      <button className='deleteButton' onClick={handleClick}>
        <AiFillDelete />
      </button>
    </AdminMenuCardContainer>
  )
}

export default AdminMenuCard