import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardCardContainer = styled.div`
  width: 30rem;
  height: 100%;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  border: solid 1px #434a54;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  .icon {
    font-size: 2.5rem;
  }
  .menu {
    text-align: left;
    h3 {
      font-size: 1.5rem;
    }
  }
`

const DashboardCard = (data) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(data.data.link);
  }

  return (
    <DashboardCardContainer onClick={handleClick}>
      <div className='icon'>{data.data.icon}</div>
      <div className='menu'>
        <h3>{data.data.title}</h3>
        <p>{data.data.description}</p>
      </div>
    </DashboardCardContainer>
  )
}

export default DashboardCard