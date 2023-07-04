import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineAppstoreAdd, AiOutlineUserAdd } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { userAuthDelete } from '../../redux/userAuthSlice';
import { userLogout } from '../../redux/UserSlice';
import AdminDashboardCard from '../../components/AdminDashboard/AdminDashboardCard';
import styled from 'styled-components';

const AdminDashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    h1 {
      padding-top: 2rem;
    }
    h3 {
      padding-bottom: 1rem;
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
  }
  .menuContainer {
    margin-top: 2rem;
    display: grid;
    text-align: center;
    grid-template-columns: 25rem 25rem;
    grid-template-rows: 10rem 10rem;
    gap: 2rem;
  }
`

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminDashboardMenu = [
    {
      'id': 'adbm1',
      'title': 'Add new menu',
      'icon': <AiOutlineAppstoreAdd />,
      'link': '/addmenu',
    },
    {
      'id': 'adbm2',
      'title': 'Update menu',
      'icon': <RxUpdate />,
      'link': '/updatemenu'

    },
    {
      'id': 'adbm3',
      'title': 'Add new staff',
      'icon': <AiOutlineUserAdd />,
      'link': '/addstaff'
    },
    {
      'id': 'adbm4',
      'title': 'Update staff information',
      'icon': <RxUpdate />,
      'link': '/updatestaff'

    },
  ]

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(userAuthDelete());
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <AdminDashboardContainer>
      <div className='title'>
        <h1>This is Admin page</h1>
        <h3>Please sign out when you finish editing information.
          <button className='signOut' onClick={handleClick}>Sign out</button>
        </h3>
      </div>
      <div className='menuContainer'>
        { adminDashboardMenu.map((item) => {
          return <AdminDashboardCard key={item.id} data={item} />
        })}
      </div>
    </AdminDashboardContainer>
  )
}

export default AdminDashboard