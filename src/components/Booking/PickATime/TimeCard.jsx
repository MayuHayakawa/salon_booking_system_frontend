import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { setTime } from '../../../redux/newbookingSlice';
import styled from 'styled-components';

const TimeCardContainer = styled.div`
  button {
    width: 10rem;
    height: 3rem;
    margin-top: 1rem;
    font-size: 1.3rem;
    font-family: 'Open Sans';
    font-weight: 600;
    color: white;
    background-color: #b14d59;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`

const TimeCard = (data) => {
  const booking = useSelector(state => state.booking);
  const newbooking = useSelector(state => state.newbooking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ bookingTime, setBookingTime ] = useState({
    startTime: null,
    endingTime: null
  })
  const [ overLap, setOverLap ] = useState(false);

  useEffect(() => {
    const pickedDate = new Date(newbooking.pickedDay);
    const pickedTime = getTimeFromTimeString(data.data);
    const pickedDateTime = new Date(pickedDate);

    // Unix
    const startTimeUnix = pickedDateTime.setHours(pickedTime.hours, pickedTime.minutes, 0, 0);
    const endingTimeUnix = startTimeUnix + (newbooking.duration * 60000);

    // Date
    // console.log(new Date(startTimeUnix));
    // console.log(new Date(endingTimeUnix));

    setBookingTime(
      {
        startTime: startTimeUnix,
        endingTime: endingTimeUnix
      }
    )
  }, [data.data, newbooking.duration, newbooking.pickedDay]);

  const checkTimeSlotOverlap = useCallback((startTime, endTime, pickedDay, timeString) => {
    const toHours = Math.floor(newbooking.duration / 60);
    const toMins = newbooking.duration % 60;
    
    const pickedDate = new Date(pickedDay);
    const pickedTime = getTimeFromTimeString(timeString);

    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);

    // const pickedDateTime = new Date(pickedDate);
    // pickedDateTime.setHours(pickedTime.hours, pickedTime.minutes, 0, 0);

    const pickedStartTime = new Date(pickedDate);
    pickedStartTime.setHours(pickedTime.hours, pickedTime.minutes, 0, 0);
    // console.log('s:' + pickedStartTime);

    const pickedEndingTime = new Date(pickedDate);
    pickedEndingTime.setHours(pickedTime.hours + toHours, pickedTime.minutes + toMins, 0, 0);
    // console.log('e:' + pickedEndingTime);

    if (pickedStartTime >= startDateTime && pickedStartTime <= endDateTime) {
      return true;
    }

    if (pickedEndingTime >= startDateTime && pickedEndingTime <= endDateTime) {
      return true;
    }

    return false;
  },[newbooking.duration]);

  useEffect(() => {
    let hasOverlap = false;
    booking.data.map((item) => {
      const isOverlap = checkTimeSlotOverlap(item.startTime, item.endingTime, newbooking.pickedDay, data.data);
      if (isOverlap) {
        hasOverlap = true;
      }
    });
    
    setOverLap(hasOverlap);
  }, [booking.data, newbooking.pickedDay, data.data, checkTimeSlotOverlap]);

  function getTimeFromTimeString(timeString) {
    const [time, meridiem] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
  
    let parsedHours = parseInt(hours);
    if (meridiem === "PM" && parsedHours !== 12) {
      parsedHours += 12;
    } else if (meridiem === "AM" && parsedHours === 12) {
      parsedHours = 0;
    }
  
    const timeObject = {
      hours: parsedHours,
      minutes: parseInt(minutes)
    };
  
    return timeObject;
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setTime(bookingTime));
    navigate('/menu/confirm');
  }

  return (
    <TimeCardContainer>
      { overLap != true && <div><button onClick={handleClick}>{data.data}</button></div>}
    </TimeCardContainer>
  )
}

export default TimeCard