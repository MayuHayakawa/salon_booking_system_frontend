import { useSelector } from 'react-redux';
import AppointmentsCard from '../../components/Dashboard/AppointmentsCard';
import styled from 'styled-components';

const AppointmentsContainer = styled.div`
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
  .containers {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5rem;
    justify-content: center;
    .container {
      width: 30rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }
  }
`

const Appointments = () => {
  const booking = useSelector(state => state.booking);
  const currentTime = new Date();

  return (
    <AppointmentsContainer>
      <h1>Your Appointments</h1>
      <div className='containers'>
        <div className='container'>
          <h2>Upcomings</h2>
          <div>
            { booking.data.map((item) => {
              if(new Date(item.startTime) >= currentTime) {
                return <AppointmentsCard key={item._id} data={item} isUpcoming={true} />
              }
            })}
          </div>
        </div>
        <div className='container'>
          <h2>Histories</h2>
          <div>
            { booking.data.map((item) => {
              if(new Date(item.startTime) <= currentTime) {
                return <AppointmentsCard key={item._id} data={item} isUpcoming={false} />
              }
            })}
          </div>
        </div>
      </div>

    </AppointmentsContainer>
  )
}

export default Appointments