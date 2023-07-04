import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../redux/userAuthSlice';
import { getUserProfile } from '../../redux/UserSlice';
import { getUserBooking } from '../../redux/bookingSlice';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  justify-content: center;
  form {
    width: 20rem;
    height: 100%;
    padding-top: 2rem;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .toLogin {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      button {
        border: none;
        text-decoration:underline;
        color: #b14d59;
        font-family: 'Open Sans';
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
      }
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
    .RegisterButton {
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ registerInfo, setRegisterInfo ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(registerInfo))
      .then(() => dispatch(getUserProfile()))
      .then(() => dispatch(getUserBooking()))
      .then(() => navigate('/dashboard'))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit}>
        <h1>CREATE ACCOUNT</h1>
        <div className='toLogin'>
          <h3>Been here before?</h3>
          <button onClick={handleClick}>Sign in here.</button>
        </div>
        <div className='inputArea'>
          <label>Your first name</label>
          <input
            onChange={handleChange}
            type='text'
            id='firstName'
            name='firstName'
            placeholder='First name'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Your last name</label>
          <input
            onChange={handleChange}
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Last name'
            required
          />
        </div>
        <div className='inputArea'>
          <label>Your email address</label>
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
          <label>Choose a password</label>
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
          <label>Your mobile phone number</label>
          <input 
            onChange={handleChange}
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            placeholder='Mobile phone number'
            required
          />
        </div>
        <button className='RegisterButton'>Create account</button>
      </form>
    </RegisterContainer>
  )
}

export default Register