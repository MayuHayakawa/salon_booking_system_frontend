import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BsPersonCircle } from 'react-icons/bs';
import { BsCalendarCheck } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { deleteBookingInfo } from '../../redux/bookingSlice';
import styled from 'styled-components';

const AppointmentsCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 13rem;
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
  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  div {
    display: flex;
    gap: 1rem;
    align-items: center;
    .staffIcon {
      color: #b14d59;
      font-size: 1.5rem;
    }
    .timeIcon {
    color: #b14d59;
    font-size: 1.5rem;
    }
  }
  button {
    position: absolute;
    top: 2rem;
    right: 2rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    .closeIcon {
      color: #b14d59;
      font-size: 2rem;
    }
  }
`

const deleteBooking = createAsyncThunk("booking/deleteBooking", async( id, thunkAPI) => {
  const Token = await thunkAPI.getState().userAuth.data;
  try {
    axios.defaults.headers.common['token'] = `${Token.accessToken}`;
    //not delete, use post request
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/booking/deleteBooking", { id });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const AppointmentsCard = (data) => {
  const menu = useSelector(state => state.menu);
  const allStaff = useSelector(state => state.allStaff);
  const dispatch = useDispatch();

  console.log(data);

  const [ menuInfo, setMenuInfo ] = useState("");
  const [ staffInfo, setStaffInfo ] = useState("");

  const convertedTime = convertMinutesToTime(menuInfo.duration);
  const bookingStartTime = formatTime(data.data.startTime);

  useEffect(() => {
    const selectedMenu = menu.data.find(item => item._id === data.data.menuId);
    if (selectedMenu) {
      setMenuInfo(selectedMenu);
    }
  }, [data.data.menuId, menu]);

  useEffect(() => {
    const selectedMenu = allStaff.data.find(staff => staff._id === data.data.staffId);
    if(selectedMenu) {
      setStaffInfo(selectedMenu);
    }
  }, [data.data.staffId, allStaff]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteBooking(data.data._id));
    dispatch(deleteBookingInfo(data.data._id));
  }

  function formatTime(timeString) {
    const date = new Date(timeString);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  }

  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if(mins === 0) {
      const timeString = `${hours}hr`;
      return timeString;
    } else if(hours === 0) {      
      const timeString = `${mins}min`;
      return timeString;
    } else {
      const timeString = `${hours}hr${mins}min`;
      return timeString;
    }
  }

  return (
    <AppointmentsCardContainer>
      <h2>{menuInfo.menuname}</h2>
      <div>
        <h3>{convertedTime}</h3>
        <h3>CA${menuInfo.duration}</h3>
      </div>
      <div>
        <BsPersonCircle className='staffIcon' />
        <h3>with {staffInfo.staffName}</h3>
      </div>
      <div>
        <BsCalendarCheck className='timeIcon' />
        <h3>{bookingStartTime}</h3>
      </div>
      { data.isUpcoming === true && 
        <button onClick={handleClick}>
          <AiOutlineCloseCircle className='closeIcon' />
        </button>
      }
    </AppointmentsCardContainer>
  )

}

export default AppointmentsCard