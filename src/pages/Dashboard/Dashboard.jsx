import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsCalendarCheck } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { userAuthDelete } from '../../redux/userAuthSlice';
import { userLogout } from '../../redux/UserSlice';
import DashboardCard from '../../components/Dashboard/DashboardCard';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  justify-content: center;
  /* text-align: center; */
  /* align-items: center; */
  .container {
    width: 70%;
    height: 50%;
    padding-top: 2rem;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .title {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .signOut {
        margin-left: 0.5rem;
        border: none;
        text-decoration:underline;
        color: #b14d59;
        font-family: 'Open Sans';
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
      }
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
  }
`

const Dashboard = () => {
  const user = useSelector(state => state.user);
  const booking = useSelector(state => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ upcomingBookings, setUpcomingBookings ] = useState([]);
  
  useEffect(() => {
    const currentTime = new Date();
    setUpcomingBookings(booking.data.filter((item) => new Date(item.startTime) >= currentTime));
  }, [booking])
  
  useEffect(() => {
    if(user.data.email === 'admin@admin.com') {
      navigate('/admindashboard');
    }
  },[navigate, user])

  const dashboardMenu = [
    {
      'id': 'dbm1',
      'title': 'Appointments',
      'icon': <BsCalendarCheck />,
      'description': upcomingBookings.length != 0 ? `You have ${upcomingBookings.length} appointments` : 'No upcoming appointments',
      'link': '/appointments'
    },
    {
      'id': 'dbm2',
      'title': 'Account',
      'icon': <AiOutlineSetting />,
      'description': 'Your information and personal preferences',
      'link': '/account'
    }
  ]

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(userAuthDelete());
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <DashboardContainer>
      <div className='container'>
        <div className='title'>
          <h1>Hi, {user.data && user.data.firstName}</h1>
          <h3>You are signed in as {user.data && user.data.email}. Not you? 
            <button className='signOut' onClick={handleClick}>Sign out</button>
          </h3>
        </div>
        <div className='card'>
          { dashboardMenu.map((item) => {
            return <DashboardCard key={item.id} data={item} />
          })}
        </div>
      </div>
    </DashboardContainer>
  )
}

export default Dashboard