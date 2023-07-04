import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { setDate } from '../../../redux/newbookingSlice';
import styled from 'styled-components';

const PickADayContainer = styled.div`
  margin-top: 3rem;
`

const PickADay = () => {
  const dispatch = useDispatch();
  
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const [ value, setValue ] = useState(tomorrow);

  const handleDateChange = (date) => {
    const timestamp = date.getTime();
    setValue(timestamp);
  }

  useEffect(() => {
    dispatch(setDate(value));
  }, [dispatch, value]);

  return (
    <PickADayContainer>
      <Calendar 
        onChange={handleDateChange} 
        value={new Date(value)} 
        calendarType={'US'}
        locale={'en-EN'}
        minDate={tomorrow}
        // minDate={today}
      />
    </PickADayContainer>
  )
}

export default PickADay