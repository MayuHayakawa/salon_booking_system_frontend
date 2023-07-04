import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMenu } from '../../redux/menuSlice';
import styled from 'styled-components';

const AddMenuContainer = styled.div`
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

const addMenu = createAsyncThunk("menu/addMenu", async({ menuname, duration, price, description }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/menu/addMenu", { menuname, duration, price, description });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const AddMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ newMenuInfo, setNewMenuInfo ] = useState({
    menuname: "",
    duration: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenuInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMenu(newMenuInfo))
      .then(() => dispatch(getMenu()))
      .then(() => navigate('/admindashboard'))
      .catch((error) => {
        console.log(error);
    });
  };

  return (
    <AddMenuContainer>
      <form onSubmit={handleSubmit}>
        <h1>ADD NEW MENU</h1>
        <div className='inputArea'>
          <label>Menu name</label>
          <input
            onChange={handleChange}
            type='text'
            id='menuname'
            name='menuname'
            placeholder='Menu name'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Duration(min)</label>
          <input
            onChange={handleChange}
            type='number'
            id='duration'
            name='duration'
            placeholder='Duration'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Price</label>
          <input
            onChange={handleChange}
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Description</label>
          <input
            onChange={handleChange}
            type='text'
            id='description'
            name='description'
            placeholder='Description'
          />
        </div>
        <button className='addButton'>Add new menu</button>
      </form>
    </AddMenuContainer>
  )
}

export default AddMenu