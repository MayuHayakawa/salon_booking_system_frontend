import { useSelector } from 'react-redux';
import PickADay from '../../components/Booking/PickATime/PickADay';
import TimeCardContainer from '../../components/Booking/PickATime/TimeCardContainer';
import styled from 'styled-components';

const PickeATimeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding: 2rem 0;
  }
  .bookingInfo {
    display: flex;
    justify-content: center;
    gap: 5rem;
    .appointmentInfo {
      width: 20rem;
      .appointmentTop {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        .duration {
          color: gray;
        }
      }
      .appointmentBottom {
        display: flex;
        flex-direction: column;
        .imageAndAppointmentInfo {
          padding: 1rem;
          display: flex;
          justify-content: start;
          gap: 2rem;
          background-color: white;
          border: solid 1px #434a54;
          border-radius: 5px;
          .image {
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            background-color: pink;
          }
          .names {
            display: flex;
            flex-direction: column;
            h3 {
              font-size: 1.3rem;
            }
          }
        }
      }
    }
  }
`

const PickATime = () => {
  const newbooking = useSelector(state => state.newbooking);

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

  const convertedTime = convertMinutesToTime(newbooking.duration);

  return (
    <PickeATimeContainer>
      <h1>PICK A TIME</h1>
      <div className='bookingInfo'>
        <div className='appointmentInfo'>
          <div className='appointmentTop'>
            <h3>YOUR APPOINTMENT</h3>
            <h3 className='duration'>{convertedTime}</h3>
          </div>
          <div className='appointmentBottom'>
            <div className='imageAndAppointmentInfo'>
              <div className='image'>
                {/* <img src='' alt={newbooking.staffName} /> */}
              </div>
              <div className='names'>
                <h3>{newbooking.menuName}</h3>
                <h4>with {newbooking.staffName}</h4>
              </div>
            </div>
          </div>
        </div>
        <PickADay />
        <TimeCardContainer />
      </div>
    </PickeATimeContainer>
  )
}

export default PickATime