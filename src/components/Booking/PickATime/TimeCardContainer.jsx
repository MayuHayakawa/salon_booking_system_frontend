import { useSelector } from 'react-redux';
import TimeCard from '../PickATime/TimeCard';
import styled from 'styled-components';

const TimeCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 1rem;
  }
  .amORpm {
    display: flex;
    gap: 2rem;
    .timeSlotsContainer {
      width: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`

const TimeCardContainer = () => {
    const newbooking = useSelector(state => state.newbooking);

    const formatted = formatDate(newbooking.pickedDay);

    const morningTimeSlots = generateTimeSlots(10, 11, 45);
    const afternoonTimeSlots = generateTimeSlots(12, 18, 0);

  
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
    }

    function generateTimeSlots(start, end, endmin) {
        const startTime = new Date();
        startTime.setHours(start, 0, 0);

        const endTime = new Date();
        endTime.setHours(end, endmin, 0);

        const timeSlots = [];
        const intervalMinutes = 15;

        let currentTime = new Date(startTime);

        while(currentTime <= endTime) {
            const formattedTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            timeSlots.push(formattedTime);

            currentTime.setTime(currentTime.getTime() + intervalMinutes * 60000);
        }

        return timeSlots;
    }
  
    return (
      <TimeCards>
        <h2>{formatted}</h2>
        <div className='amORpm'>
            <div className='timeSlotsContainer'>
                <h3>MORNING</h3>
                { morningTimeSlots.map((slot) => {
                    return <TimeCard key={slot} data={slot} />
                })}
            </div>
            <div className='timeSlotsContainer'>
                <h3>AFTERNOON</h3>
                { afternoonTimeSlots.map((slot) => {
                    return <TimeCard key={slot} data={slot} />
                })}
            </div>
        </div>
      </TimeCards>
    )
}

export default TimeCardContainer