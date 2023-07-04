import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdminDashboardCardContainer = styled.div`
  background-color: white;
  padding: 2rem 1rem;
  border: solid 1px #434a54;
  border-radius: 5px;
  cursor: pointer;
  .icon {
    color: #b14d59;
    font-size: 2rem;
  }
`

const AdminDashboardCard = (data) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(data.data.link);
  }

  return (
    <AdminDashboardCardContainer onClick={handleClick}>
      <h3 className='icon'>{data.data.icon}</h3>
      <h2>{data.data.title}</h2>
    </AdminDashboardCardContainer>
  )
}

export default AdminDashboardCard