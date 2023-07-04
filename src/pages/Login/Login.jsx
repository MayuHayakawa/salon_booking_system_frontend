import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/userAuthSlice';
import { getUserProfile } from '../../redux/UserSlice';
import { getUserBooking } from '../../redux/bookingSlice';
import styled from 'styled-components';

const LoginContainer = styled.div`
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
    .toRegister {
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
    .singInButton {
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ loginInfo, setLoginInfo ] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginInfo))
      .then(() => dispatch(getUserProfile()))
      .then(() => dispatch(getUserBooking()))
      .then(() => navigate('/dashboard'))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <h1>SIGN IN</h1>
        <div className='toRegister'>
          <h3>New here?</h3>
          <button onClick={handleClick}>Create an account</button>
        </div>
        <div className='inputArea'>
          <label>Email address</label>
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
        <button className='singInButton'>Sign in</button>
      </form>
    </LoginContainer>
  )
}

export default Login