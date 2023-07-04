import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userUpdateInfo } from "../../redux/UserSlice";
import styled from 'styled-components';

const AccountContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    padding: 2rem;
  }
  form {
    width: 50rem;
    height: 100%;
    padding: 2rem;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: white;
    border: solid 0.5px #434a54;
    border-radius: 5px;
    h2 {
      border-bottom: solid 0.5px #434a54;
    }
    .inputContainer {
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      .inputArea {
        width: 30rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        div{
          display: flex;
          flex-direction: column;
          label {
            text-align: left;
          }
          input {
            height: 3rem;
            padding: 0 1rem;
            font-size: 1rem;
            border: solid 1px #434a54;
            border-radius: 5px;
          }
        }
      }
    }
    .nameContainer {
      border-bottom: solid 0.5px #bf958d;
    }
    button {
      width: 50%;
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

const updateUserProfile = createAsyncThunk("user/updateUserProfile", async({ firstName, lastName, email, phoneNumber }, thunkAPI) => {
  const Token = await thunkAPI.getState().userAuth.data;
  try {
    axios.defaults.headers.common['token'] = `${Token.accessToken}`;
    const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/user/updateUserProfile", { firstName, lastName, email, phoneNumber });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const Account = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ updateInfo, setUpdateInfo ] = useState({
    firstName: user.data.firstName,
    lastName: user.data.lastName,
    email: user.data.email,
    phoneNumber: user.data.phoneNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(updateInfo));
    dispatch(userUpdateInfo(updateInfo));
    navigate('/dashboard');
  };

  return (
    <AccountContainer>
      <h1>Account</h1>
      <form onSubmit={handleSubmit}>
        <h2>BASIC INFORMATION</h2>
        <div className='inputContainer nameContainer'>
          <h3>NAME</h3>
          <div className='inputArea'>
            <div>
              <label>Your first name</label>
              <input
                onChange={handleChange}
                type='text'
                id='firstName'
                name='firstName'
                value={updateInfo.firstName}
                placeholder='First name'
              />
            </div>
            <div>
              <label>Your last name</label>
              <input
                onChange={handleChange}
                type='text'
                id='lastName'
                name='lastName'
                value={updateInfo.lastName}
                placeholder='Last name'
              />
            </div>
          </div>
        </div>
        <div className='inputContainer'>
          <h3>CONTACT INFO</h3>
          <div className='inputArea'>
            <div>
              <label>Your email address</label>
              <input
                onChange={handleChange}
                type='text'
                id='email'
                name='email'
                value={updateInfo.email}
                placeholder='Email adress'
              />
            </div>
            <div>
              <label>Your mobile phone number</label>
              <input
                onChange={handleChange}
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
                value={updateInfo.phoneNumber}
                placeholder='Mobile phone number'
              />
            </div>
          </div>
        </div>
        {/* <div>
          <h3>DELETE YOUR ACCOUNT</h3>
          <div>
            <p>If you would no longer like us to have your information, you can request that we delete your account.</p>
            <button>Delete my account</button>
          </div>
        </div> */}
        <div>
          <button>Save change</button>
        </div>
      </form>
    </AccountContainer>
  )
}

export default Account