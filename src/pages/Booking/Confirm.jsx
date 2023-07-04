import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from 'react-icons/bs';
import { BsCalendarCheck } from 'react-icons/bs';
import { GoStopwatch } from 'react-icons/go';
import { getUserBooking } from '../../redux/bookingSlice';
import styled from 'styled-components';

const ConfirmContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding: 2rem 0;
  }
  .detailContainer {
    width: 50%;
    height: 100%;
    margin-bottom: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    gap: 0.3rem;
    background-color: white;
    border: solid 1px #434a54;
    border-radius: 5px;
    .title {
      border-bottom: 2px solid #b14d59;
    }
    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    div {
      display: flex;
      gap: 1rem;
      align-items: center;
      .icon {
        color: #b14d59;
        font-size: 1.5rem;
      }
    }
  }
  button {
    width: 10rem;
    height: 3.5rem;
    font-size: 1.5rem;
    font-family: 'Open Sans';
    font-weight: 600;
    color: white;
    background-color: #b14d59;
    border: none;
    border-radius: 5px;
  }
`

const addBooking = createAsyncThunk("booking/addBooking", async({ firstName, lastName, phoneNumber, staffId, menuId, startTime, endingTime }, thunkAPI) => {
  const Token = await thunkAPI.getState().userAuth.data;
  try {
    axios.defaults.headers.common['token'] = `${Token.accessToken}`;
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/booking/addBooking", { firstName, lastName, phoneNumber, staffId, menuId, startTime, endingTime });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const Confirm = () => {
  const user = useSelector(state => state.user);
  const newbooking = useSelector(state => state.newbooking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ bookingInfo, setBookingInfo ] = useState(
    {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      staffId: null,
      menuId: null,
      startTime: null,
      endingTime: null
    }
  );

  const convertedTime = convertMinutesToTime(newbooking.duration);
  const BookingDay = convertUnixToDateString(newbooking.startTime);
  const BookingTime = formatTimeFromUnix(newbooking.startTime);

  useEffect(() => {
    setBookingInfo(
      {
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        phoneNumber: user.data.phoneNumber,
        staffId: newbooking.staffId,
        menuId: newbooking.menuId,
        startTime: new Date(newbooking.startTime),
        endingTime: new Date(newbooking.endingTime)
      }
    )
  },[newbooking.endingTime, newbooking.menuId, newbooking.staffId, newbooking.startTime, user.data.firstName, user.data.lastName, user.data.phoneNumber])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addBooking(bookingInfo))
      .then(() => dispatch(getUserBooking()))
      .then(() => navigate('/dashboard'))
      .catch((error) => {
        console.log(error);
      });
  }
  
  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if(mins === 0) {
      const timeString = `${hours}hr`;
      return timeString;
    } else {
      const timeString = `${hours}hr${mins}min`;
      return timeString;
    }
  }

  function convertUnixToDateString(unixTimestamp) {
    const date = new Date(parseInt(unixTimestamp));
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
  
    const dateString = `${dayOfWeek}, ${month} ${day}, ${year}`;
    return dateString;
  }

  function formatTimeFromUnix(unixTimestamp) {
    const date = new Date(parseInt(unixTimestamp));
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  return (
    <ConfirmContainer>
      <h1>ALMOST DONE!</h1>
      <div className='detailContainer'>
        <h3 className='title'>YOUR APPOINTMENT DETAILS</h3>
        <h2>{newbooking.menuName}</h2>
        <div>
          <h3>{convertedTime}</h3>
          <h3>CA${newbooking.price}</h3>
        </div>
        <div>
          <BsPersonCircle className='icon' />
          <h3>with {newbooking.staffName}</h3>
        </div>
        <div>
          <BsCalendarCheck className='icon' />
          <h4>{BookingDay}</h4>
        </div>
        <div>
          <GoStopwatch className='icon' />
          <h4>{BookingTime}</h4>
        </div>
      </div>
      <div>
        <button onClick={handleClick}>Booking</button>
      </div>
    </ConfirmContainer>
  )
}

export default Confirm